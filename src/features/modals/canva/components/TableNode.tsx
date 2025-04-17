import React from "react";
import { MoreButton } from "./MoreButton";

interface Column {
	id: string;
	name: string;
	type: string;
}

export interface TableData {
	[key: string]: unknown;
	label: string;
	columns: Column[];
	nestedTables?: TableData[];
}

const AttributeNode = ({ column }: { column: Column }) => {
	return (
		<div className="table-attribute">
			<span className="text-white">{column.name}</span>
			<div>
				<span className="text-gray">{column.type}</span>
				<div className="table-attribute__options">
					<MoreButton className="text-gray" />
				</div>
			</div>
		</div>
	);
};

// Custom node types
export const TableNode = ({ data }: { data: TableData }) => {
	return (
		// table
		<div className="table">
			{/* table header */}
			<div className="table-header text-white">
				<span>{data.label}</span>
				<MoreButton className="hover:text-gray" />
			</div>
			{/* table content */}
			<div className="table-content">
				{/* table attributes */}
				<div className="table-attributes">
					{data.columns.map((column, index) => (
						<React.Fragment key={column.id}>
							<AttributeNode column={column} />
							{index < data.columns.length - 1 && (
								<hr className="border border-border-gray" />
							)}
						</React.Fragment>
					))}
				</div>
				{data.nestedTables && data.nestedTables.length > 0 && (
					// table nested
					<div className="table-nesteds">
						{data.nestedTables.map((nestedTable) => (
							<TableNode key={nestedTable.label} data={nestedTable} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export const nodeTypes = {
	table: TableNode,
};
