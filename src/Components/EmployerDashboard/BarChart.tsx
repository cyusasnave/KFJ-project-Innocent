import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CustomTooltipTypes {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const salesData = [
  {
    name: "Jan",
    Users: 10,
    Interation: 20,
  },
  {
    name: "Feb",
    Users: 20,
    Interation: 40,
  },
  // Add data for other months...
];

const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={salesData}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="Users" fill="#2563eb" />
        <Bar dataKey="Interation" fill="#8b5cf6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipTypes) => {
  if (active && payload && payload.length) {
    const totalUsers = payload.reduce(
      (acc, entry) => acc + entry.payload.Users,
      0
    );
    const totalInteractions = payload.reduce(
      (acc, entry) => acc + entry.payload.Interation,
      0
    );

    return (
      <div className="p-4 bg-indigo-200 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        {payload.map((entry, index) => (
          <div key={index}>
            <p className="text-sm text-blue-400">
              Users: {entry.payload.Users} (
              {((entry.payload.Users / totalUsers) * 100).toFixed(2)}%)
            </p>
            <p className="text-sm text-indigo-400">
              Interation: {entry.payload.Interation} (
              {((entry.payload.Interation / totalInteractions) * 100).toFixed(
                2
              )}
              %)
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default BarChartComponent;
