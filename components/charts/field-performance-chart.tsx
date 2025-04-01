"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "North Field", yield: 195, average: 186 },
  { name: "South Valley", yield: 58, average: 55 },
  { name: "East Ridge", yield: 75, average: 70 },
  { name: "West Plains", yield: 180, average: 175 },
  { name: "Central Acres", yield: 165, average: 160 },
  { name: "River Bottom", yield: 210, average: 190 },
]

export function FieldPerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="yield" name="Current Yield (bu/ac)" fill="#22c55e" />
          <Bar dataKey="average" name="Average Yield (bu/ac)" fill="#84cc16" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

