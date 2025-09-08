import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const insightsCache = new Map();

const withTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), ms)
    ),
  ]);

const generateWithRetries = async (model, prompt, retries = 3, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await withTimeout(model.generateContent(prompt), 15000);
      return result.response?.text() || "{}";
    } catch (err) {
      if (i < retries - 1) await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("Gemini request failed after retries");
};

const cleanAIOutput = (raw) => {
  let cleaned = raw.replace(/```json|```/g, "").trim();
  cleaned = cleaned.replace(/,\s*}/g, "}");
  cleaned = cleaned.replace(/,\s*$/g, "");

  try {
    const parsed = JSON.parse(cleaned);
    return {
      summary: parsed.summary || "No summary available.",
      language: parsed.language || "No language analysis available.",
      contribution: parsed.contribution || "No contribution insights available.",
    };
  } catch {
    return { summary: cleaned, language: "", contribution: "" };
  }
};

app.post("/api/insights", async (req, res) => {
  const { repoData } = req.body;
  if (!repoData) return res.status(400).json({ error: "Missing repo data" });

  const cacheKey = repoData.full_name;
  if (insightsCache.has(cacheKey)) {
    return res.json({ insights: insightsCache.get(cacheKey) });
  }

  const prompt = `
You are analyzing a GitHub repository. Output a JSON object with exactly three fields:
1. summary: A human-readable paragraph summarizing the repository's purpose and key features.
2. language: A short paragraph analyzing the programming language(s) used.
3. contribution: A short paragraph describing contribution patterns and collaboration health.

Repository Info:
- Name: ${repoData.full_name}
- Description: ${repoData.description || "No description"}
- Stars: ${repoData.stargazers_count}
- Forks: ${repoData.forks_count}
- Open Issues: ${repoData.open_issues_count}
- Primary Language: ${repoData.language}
- README: ${repoData.readme || "No README available"}

Respond only with valid JSON.
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    let text = await generateWithRetries(model, prompt, 3, 3000);
    const insights = cleanAIOutput(text);
    insightsCache.set(cacheKey, insights);
    res.json({ insights });
  } catch {
    const fallbackInsights = {
      summary: "AI service temporarily unavailable or quota exceeded.",
      language: "No language analysis available.",
      contribution: "No contribution insights available.",
    };
    insightsCache.set(cacheKey, fallbackInsights);
    res.json({ insights: fallbackInsights });
  }
});

app.listen(5174, () => console.log("Server running on http://localhost:5174"));
