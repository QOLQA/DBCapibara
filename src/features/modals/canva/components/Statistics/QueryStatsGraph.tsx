'use client'

import { getHandledQueries } from "@/lib/getHandledQueries"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
	ResponsiveContainer,
} from "recharts"


export const QueryStatsGraph = () => {

	const handledPercentage = getHandledQueries()
	const porcentageAngle = (handledPercentage * 360) / 100
	
	const chartData = [
		{
			porcentage: handledPercentage,
			fill: "var(--color-red)",
		}
	]
	return (
		<ResponsiveContainer
			width="100%"
			height="100%"
			className="aspect-square max-h-[250px]"
		>
			<RadialBarChart
				data={chartData}
				startAngle={0}
				endAngle={porcentageAngle}
				innerRadius={80}
				outerRadius={110}
			>
				<PolarGrid
					gridType="circle"
					radialLines={false}
					stroke="none"
					className="first:fill-[#3C4254] last:fill-cuartenary-gray"
					polarRadius={[86, 74]}
				/>
				<RadialBar dataKey="porcentage"  className="fill-cuartenary-gray" cornerRadius={10} />
				<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
					<Label
						content={({ viewBox }) => {
							if (viewBox && "cx" in viewBox && "cy" in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
										dominantBaseline="middle"
									>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) - 7}
											className="fill-white text-4xl font-bold"
										>
											{handledPercentage}%
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-white text-p"
										>
											Consultas
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 40}
											className="fill-white text-p"
										>
											abordadas
										</tspan>
									</text>
								)
							}
						}}
					/>
				</PolarRadiusAxis>
			</RadialBarChart>
		</ResponsiveContainer>
	)
}
