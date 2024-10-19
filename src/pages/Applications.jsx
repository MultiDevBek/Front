import './Applications.css';
import mockData from '../mockData';
import { useTable, usePagination } from 'react-table'; // Импортируем usePagination
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

    // Добавляем usePagination для пагинации
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Используем page вместо rows для пагинации
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 7 }, // Начальная страница и количество строк на странице
        },
        usePagination // Подключаем хук пагинации
    );

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
                        {page.map((row) => { // Используем page вместо rows
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

                {/* Элементы управления пагинацией */}
                <div className="pagination">
                    <div className='next_page_btn'>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {"<<"}
                        </button>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {"<"}
                        </button>
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            {">"}
                        </button>
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            {">>"}
                        </button>
                    </div>
                    
                    <div className='page_number'>
                        <span>
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                    </div>
                    
                    <div className='go_to_page'>
                        <span>
                            | Go to page:{' '}
                            <input
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    gotoPage(page);
                                }}
                                style={{ width: '100px' }}
                            />
                        </span>
                    </div>
                   
                    <select
                        value={pageSize}
                        onChange={e => setPageSize(Number(e.target.value))}
                    >
                        {[5, 7, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Applications;
