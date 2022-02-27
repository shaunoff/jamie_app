import React, { useState } from "react"
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts"
import { LocationData } from "./LocationBarChart"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

interface ChartProps {
  location: LocationData[number]
}

ChartJS.register(ArcElement, Tooltip, Legend)

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
]

const Chart: React.FC<ChartProps> = ({ location }) => {
  console.log(location)
  const data = {
    datasets: [
      {
        data: [location.poor, location.satisfactory, location.good],
        backgroundColor: ["red", "orange", "#82ca9d"],
      },
    ],
  }
  return (
    <div style={{ width: 100, height: 140 }}>
      <p className="font-medium text-gray-600 text-center">{location.name}</p>
      <Doughnut data={data} />
    </div>
  )
}

export default Chart
