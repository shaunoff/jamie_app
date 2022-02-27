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

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

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
