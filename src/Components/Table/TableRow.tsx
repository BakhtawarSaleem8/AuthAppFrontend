// src/components/Table/TableRow.tsx
import React from 'react';
import { ColumnDefinition } from '../../types/Category.types'
import AnimatedButton from '../Buttons/AnimatedButton';

interface TableRowProps<T> {
  row: T;
  columns: ColumnDefinition<T>[];
  rowKey: keyof T;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TableRow = <T,>({ row, columns, rowKey, onEdit, onDelete }: TableRowProps<T>) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {columns.map((column, index) => (
        <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {column.render ? column.render(row) : (row[column.key as keyof T] as React.ReactNode)}
        </td>
      ))}
      {(onEdit || onDelete) && (
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {onEdit && (
            <button
              data-action="edit"
              data-row-id={String(row[rowKey])} // Use rowKey to get the unique identifier
              className="mr-2 text-indigo-600 hover:text-indigo-900"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              data-action="delete"
              data-row-id={String(row[rowKey])} // Use rowKey to get the unique identifier
              className="text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          )}
        </td>
      )}
    </tr>
  );
};

export default TableRow;