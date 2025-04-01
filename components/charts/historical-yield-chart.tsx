"use client"

import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Historical yield data from 1990 to 2025
const data = [
  { year: "1990", corn: 118, soybeans: 34, wheat: 39 },
  { year: "1995", corn: 125, soybeans: 35, wheat: 41 },
  { year: "2000", corn: 137, soybeans: 38, wheat: 42 },
  { year: "2005", corn: 148, soybeans: 43, wheat: 45 },
  { year: "2010", corn: 159, soybeans: 47, wheat: 47 },
  { year: "2015", corn: 168, soybeans: 52, wheat: 52 },
  { year: "2020", corn: 178, soybeans: 55, wheat: 54 },
  { year: "2023", corn: 186, soybeans: 58, wheat: 56 },
  { year: "2025", corn: 195, soybeans: 60, wheat: 58 },
]

export function HistoricalYieldChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip formatter={(value) => `${value} bu/ac`} />
          <Legend />
          <Line type="monotone" dataKey="corn" name="Corn (bu/ac)" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
          <Line
            type="monotone"
            dataKey="soybeans"
            name="Soybeans (bu/ac)"
            stroke="#84cc16"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line type="monotone" dataKey="wheat" name="Wheat (bu/ac)" stroke="#eab308" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

