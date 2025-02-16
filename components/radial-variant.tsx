import { formatCurrency } from "@/lib/utils";
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

type RadialVariantProps = {
  data?: {
    name: string;
    value: number;
  }[];
};

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

export function RadialVariant({ data }: RadialVariantProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadialBarChart
        cy="30%"
        cx="50%"
        barSize={10}
        innerRadius="90%"
        outerRadius="40%"
        data={data?.map((item, index) => ({
          ...item,
          fill: COLORS[index % COLORS.length],
        }))}
      >
        <RadialBar
          dataKey="value"
          background
          label={{
            position: "insideStart",
            fill: "#fff",
            fontSize: "12px",
          }}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }) => {
            return (
              <ul className="flex flex-col">
                {payload?.map((entry, index) => (
                  <li
                    key={`item-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ background: entry.color }}
                    />
                    <div className="space-x-1">
                      <span className="text-sm text-muted-foreground">
                        {entry.value}
                      </span>
                      <span className="text-sm">
                        {formatCurrency(entry.payload?.value)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
