import React, { useEffect, useState } from "react";
import "./ZeTable.css";

interface Column {
  header: string;
  key: string;
  cell?: React.ComponentType<{ data: Item }>;
  minWidth?: number;
  headerCentered?: boolean;
  bodyCentered?: boolean;
  hideOnMobile?: boolean;
  textAlign?: "left" | "center" | "right";
}

type Item = Record<string, any>;

interface CustomTableProps {
  columns: Column[];
  data: Item[];
  showCheckboxes?: boolean;
  showTotal?: boolean;
  dataLength?: number;
  totalLength?: number;
  scrollable?: boolean;
  label?: string;
  loading?: boolean;
}

const ZeTable: React.FC<CustomTableProps> = ({
  columns,
  data = [],
  showCheckboxes = false,
  showTotal,
  dataLength,
  totalLength,
  scrollable = true,
  label,
  loading = false,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const handleCheckboxChange = (rowIndex: number) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((row) => row !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`custom-table-container  customTableContainer${
        scrollable ? scrollable : ""
      }`}
    >
      <table className={`custom-table card-table  cardTable`}>
        <thead className={`${scrollable ? "sticky" : ""}`}>
          <tr>
            {showCheckboxes && (
              <th
                style={{
                  width: "5px",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
            )}
            {columns.map((column, index) => {
              if (isMobile && column.hideOnMobile) {
                return null;
              }

              return (
                <th
                  key={index}
                  style={{
                    minWidth: column.minWidth ? column.minWidth : 100,
                    width: column.minWidth ? column.minWidth : 100,
                    textAlign: column.textAlign ? column.textAlign : "left",
                  }}
                >
                  {column.header}
                </th>
              );
            })}
          </tr>
        </thead>
        {showTotal && (
          <tr>
            <td
              colSpan={columns.length + (showCheckboxes ? 1 : 0)}
              className={`total`}
            >
              showing {dataLength} of {totalLength} total {label}
            </td>
          </tr>
        )}
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (showCheckboxes ? 1 : 0)}
                className={`loaders`}
              >
                <p>Loading...</p>
              </td>
            </tr>
          ) : (
            data.length > 0 &&
            data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {showCheckboxes && (
                  <>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(rowIndex)}
                      onChange={() => handleCheckboxChange(rowIndex)}
                    />
                  </>
                )}
                {columns.map((column, colIndex) => {
                  if (isMobile && column.hideOnMobile) {
                    return null;
                  }
                  return (
                    <td
                      key={colIndex}
                      style={{
                        textAlign: column.textAlign ? column.textAlign : "left",
                      }}
                    >
                      {column.cell ? (
                        <column.cell data={item} />
                      ) : (
                        item[column.key]
                      )}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
        {!loading && data.length === 0 && (
          <tr>
            <td
              colSpan={columns.length + (showCheckboxes ? 1 : 0)}
              className={`total "noDataFoundWrapper"`}
            >
              <div className={`no-data-found ${"noDataFound"}`}>
                <i className="fa-light fa-table"></i>
                No Data Found
              </div>
            </td>
          </tr>
        )}
      </table>
    </div>
  );
};

export { ZeTable };
export type { Column };
