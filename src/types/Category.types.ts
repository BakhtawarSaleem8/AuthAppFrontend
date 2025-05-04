// src/components/Table/Table.types.ts
export interface ColumnDefinition<T> {
    key: keyof T | string; // Key to access the data or a custom string
    header: string; // Column header text
    render?: (row: T) => React.ReactNode; // Optional custom render function for the cell
  }
  export interface TableData {
  _id: string; // Add _id to the interface
  categoryName: string;
  numberOfPosts: number;
}

export interface TableProps<T> {
    data: T[]; // Array of row data
    columns: ColumnDefinition<T>[]; // Column definitions
    rowKey?: keyof T; // Optional key for unique row identifier (defaults to '_id')
    onEdit?: (row: T) => void; // Optional edit handler
    onDelete?: (row: T) => void; // Optional delete handler
  }