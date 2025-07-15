import { QueryStatsGraph } from "./QueryStatsGraph"

export const AppStatistics = () => {
	return (
		<div className="flex flex-col gap-5 h-full w-full items-center">
			<div className="w-full">
				<QueryStatsGraph/>	
			</div>
			<div>
				porcentaje PA, ...
			</div>
		</div>
	)
}
