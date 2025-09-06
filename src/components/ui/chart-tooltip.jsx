import React from "react";

const ChartTooltipContent = React.forwardRef(
  (
    {
      active,
      payload,
      className = "",
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName = "",
      formatter,
      color,
      nameKey,
      labelKey,
      ...props
    },
    ref
  ) => {
    if (!active || !payload || payload.length === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-card px-2.5 py-1.5 text-xs shadow-xl " +
          className
        }
        {...props}
      >
        {!hideLabel && label && (
          <div className={"font-medium " + labelClassName}>
            {labelFormatter ? labelFormatter(label, payload) : label}
          </div>
        )}
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            {!hideIndicator && (
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            )}
            <div className="flex flex-1 justify-between leading-none">
              <div className="grid gap-1.5">
                <span className="text-muted-foreground">
                  {nameKey ? item.payload[nameKey] : item.name}
                </span>
              </div>
              <span className="font-mono font-medium tabular-nums text-foreground">
                {formatter ? formatter(item.value, item.name, item, index) : item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

ChartTooltipContent.displayName = "ChartTooltipContent";

export default ChartTooltipContent;
