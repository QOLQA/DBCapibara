import { QueryStatsGraph } from "./QueryStatsGraph"
import { SquadStats } from "./SquadStats"
import type { StastType } from "../../types"
import { StatsLineTotal } from "./StatsLineTotal"


const data: StastType[] = [
	{ name: "Patron de acceso", value: 90, color: "#0052CC" },
	{ name: "Costo de Recuperacion", value: 80, color: "#00875A" },
	{ name: "Redundancia", value: 40, color: "#5243AA" },
]

export const AppStatistics = () => {
	return (
		<div className="flex flex-col h-full w-full items-center justify-between gap-10">
			<div className="w-full">
				<QueryStatsGraph/>	
			</div>
			<div className="flex items-center justify-between w-full h-full pb-9 gap-3.5">
				<SquadStats data={data}/>
				<StatsLineTotal data={data}/>			
			</div>
		</div>
	)
}
