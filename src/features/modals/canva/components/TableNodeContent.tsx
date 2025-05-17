import { TableData } from "./TableNode";

const TableNodeContent = ({ data }: { data: TableData }) => {
  return (
    // table
    <div className="table">
      {/* table header */}
      <div className="table-header text-white">
        <span>{data.label}</span>
        <MoreButton className="hover:text-lighter-gray" />
      </div>
      {/* table content */}
      <div className="table-content">
        {/* table attributes */}
        <div className="table-attributes">
          {data.columns.map((column, index) => (
            <React.Fragment key={column.id}>
              <AttributeNode column={column} />
              {index < data.columns.length - 1 && (
                <hr className="border border-gray" />
              )}
            </React.Fragment>
          ))}
        </div>
        {data.nestedTables && data.nestedTables.length > 0 && (
          // table nested
          <div className="table-nesteds">
            {data.nestedTables.map((nestedTable) => (
              <TableNodeContent key={nestedTable.label} data={nestedTable} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
