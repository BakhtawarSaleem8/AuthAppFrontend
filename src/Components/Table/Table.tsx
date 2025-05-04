// src/components/Table/Table.tsx
import React, { useCallback } from 'react';
import { TableProps } from "../../types/Category.types";
import TableRow from './TableRow';

const Table = <T,>({ data, columns, rowKey = '_id' as keyof T, onEdit, onDelete }: TableProps<T>) => {
  // Event delegation handler
  const handleTableClick = useCallback(
    (event: React.MouseEvent<HTMLTableElement>) => {
      const target = event.target as HTMLElement;
      const button = target.closest('button');

      if (button) {
        const action = button.getAttribute('data-action');
        const rowId = button.getAttribute('data-row-id');

        if (rowId !== null) {
          const row = data.find((row) => row[rowKey] === rowId);

          if (row) {
            if (action === 'edit' && onEdit) {
              onEdit(row);
            } else if (action === 'delete' && onDelete) {
              onDelete(row);
            }
          }
        }
      }
    },
    [data, onEdit, onDelete, rowKey]
  );

  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm"
        onClick={handleTableClick}
      >
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <TableRow
              key={String(row[rowKey])} // Use rowKey to get the unique identifier
              row={row}
              columns={columns}
              rowKey={rowKey}
              onEdit={onEdit ? () => onEdit(row) : undefined}
              onDelete={onDelete ? () => onDelete(row) : undefined}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;