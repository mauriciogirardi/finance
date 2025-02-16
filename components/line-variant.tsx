import { format } from "date-fns";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { CustomTooltip } from "./custom-tooltip";

type LineVariantProps = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export function LineVariant({ data }: LineVariantProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dot={false}
          strokeWidth={2}
          dataKey="income"
          fill="#3d82f6"
          className="drop-shadow-sm"
        />
        <Line
          dot={false}
          strokeWidth={2}
          dataKey="expenses"
          fill="#f43f5e"
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
