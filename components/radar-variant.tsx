import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

type RadarVariantProps = {
  data?: {
    name: string;
    value: number;
  }[];
};

export function RadarVariant({ data }: RadarVariantProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cy="50%" cx="50%" outerRadius="60%" data={data}>
        <PolarGrid />
        <PolarAngleAxis style={{ fontSize: "12px" }} dataKey="name" />
        <PolarRadiusAxis style={{ fontSize: "12px" }} />
        <Radar
          dataKey="value"
          stroke="#3682f6"
          fill="#3682f6"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
