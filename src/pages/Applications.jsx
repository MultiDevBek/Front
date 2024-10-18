import './Applications.css';
import mockData from '../mockData';
import { useTable } from 'react-table';
import { useMemo } from 'react';

function Applications() {
    const data = useMemo(() => mockData, []);
    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Дата создания",
            accessor: "date",
        },
        {
            Header: "Категория",
            accessor: "category",
        },
        {
            Header: "Статус",
            accessor: "status",
        },
        {
            Header: "Завершить до",
            accessor: "deadline",
        },
        {
            Header: "Ответственный",
            accessor: "executor",
        },
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div className='main_table'>
            <div className='container'>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => {
                            const { key, ...rest } = headerGroup.getHeaderGroupProps();
                            return (
                                <tr key={key} {...rest}>
                                    {headerGroup.headers.map((column) => {
                                        const { key: columnKey, ...columnRest } = column.getHeaderProps();
                                        return (
                                            <th key={columnKey} {...columnRest}>
                                                {column.render("Header")}
                                            </th>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            const { key, ...rest } = row.getRowProps();
                            return (
                                <tr key={key} {...rest}>
                                    {row.cells.map((cell) => {
                                        const { key: cellKey, ...cellRest } = cell.getCellProps();
                                        return (
                                            <td key={cellKey} {...cellRest}>
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Applications;
