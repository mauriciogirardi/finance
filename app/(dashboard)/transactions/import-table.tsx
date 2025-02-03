import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableHeaderSelect } from "./table-header-select";

type ImportTableProps = {
  headers: string[];
  body: string[][];
  selectedColumns: Record<string, string | null>;
  onTableHeadSelectChange: (columnIndex: number, value: string | null) => void;
};

export function ImportTable({
  body,
  headers,
  onTableHeadSelectChange,
  selectedColumns,
}: ImportTableProps) {
  return (
    <div className="rounded-sm border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {headers.map((item, index) => (
              <TableHead key={index}>
                <TableHeaderSelect
                  columnIndex={index}
                  selectedColumns={selectedColumns}
                  onChange={onTableHeadSelectChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row: string[], indexRow) => (
            <TableRow key={indexRow}>
              {row.map((cell, indexCell) => (
                <TableCell key={indexCell}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
