import { BtnNewQuery } from "./BtnNewQuery";
import { QueryItem } from "./QueryItem";

const queries = [
	{
		full_query: "Cuantos alumnos hay en el colegio",
		collections: ["alumnos", "colegio"],
	},
	{
		full_query: "Cuantos productos hay en el categorias",
		collections: ["productos", "categorias"],
	},
];

export const AppQueries = () => {
	return (
		<div className="flex flex-col gap-5 h-full w-full items-center">
			<BtnNewQuery />
			<div className="flex flex-col gap-5 w-full h-full items-center">
				{queries.map((query, index) => (
					<QueryItem
						key={`${query.collections[0]}-${index}-queries`}
						query={query}
					/>
				))}
			</div>
		</div>
	);
};
