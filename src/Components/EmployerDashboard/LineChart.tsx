'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface CustomTooltipTypes {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const salesData = [
  {
    name: 'Jan',
    Total_Likes: 4000,
    Total_Commnets: 2400,
  },
  {
    name: 'Feb',
    Total_Likes: 3000,
    Total_Commnets: 1398,
  },
  {
    name: 'Mar',
    Total_Likes: 9800,
    Total_Commnets: 2000,
  },
  {
    name: 'Apr',
    Total_Likes: 3908,
    Total_Commnets: 2780,
  },
  {
    name: 'May',
    Total_Likes: 4800,
    Total_Commnets: 1890,
  },
  {
    name: 'Jun',
    Total_Likes: 3800,
    Total_Commnets: 2390,
  },
];

const LineChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
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
        <Line type="monotone" dataKey="Total_Likes" stroke="#3b82f6" />
        <Line type="monotone" dataKey="Total_Commnets" stroke="#8b5cf6" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;

const CustomTooltip = ({ active, payload, label }:CustomTooltipTypes) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-white text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Total_Likes:
          <span className="ml-2">{payload[0].value} likes</span>
        </p>
        <p className="text-sm text-indigo-400">
          Total_Commnets:
          <span className="ml-2">{payload[1].value} comments</span>
        </p>
      </div>
    );
  }
};