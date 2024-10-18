import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import './Users.css'; 
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';


function Users() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState({}); // Для отслеживания отмеченных строк

  const handleAddUser = () => {
    navigate('/app/add-user'); // Переход на страницу добавления пользователя
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => ({
      ...prevSelectedRows,
      [id]: !prevSelectedRows[id], // Переключаем состояние чекбокса
    }));
  };

  // Определяем данные таблицы
  const data = useMemo(
    () => [
      { id: 1, name: 'Alyvia Kelley', status: 'Исполнитель' },
      { id: 2, name: 'Jaiden Nixon', status: 'Исполнитель' },
      { id: 3, name: 'Ace Foley', status: 'Удален' },
      { id: 4, name: 'Nikolai Schmidt', status: 'Администратор' },
      { id: 5, name: 'Clayton Charles', status: 'Исполнитель' },
    ],
    []
  );

  // Определяем колонки таблицы
  const columns = useMemo(
    () => [
      {
        id: 'selection',
        Header: () => (
          <input
            type="checkbox"
            onChange={(e) => {
              const isChecked = e.target.checked;
              const allSelected = {};
              data.forEach(({ id }) => {
                allSelected[id] = isChecked;
              });
              setSelectedRows(allSelected); // Отмечаем или снимаем все чекбоксы
            }}
          />
        ),
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={!!selectedRows[row.original.id]}
            onChange={() => handleCheckboxChange(row.original.id)}
          />
        ),
      },
      {
        Header: 'ФИО',
        accessor: 'name', // Свойство данных для имени
      },
      {
        Header: 'Статус',
        accessor: 'status', // Свойство данных для статуса
        Cell: ({ value }) => {
          // Отображаем статус с цветным кружком
          let color;
          switch (value) {
            case 'Исполнитель':
              color = 'green';
              break;
            case 'Удален':
              color = 'gray';
              break;
            case 'Администратор':
              color = 'red';
              break;
            default:
              color = 'black';
          }
          return (
            <span>
              <span className='dot'
                style={{
                  backgroundColor: color,
                }}
              />
              {value}
            </span>
          );
        },
      },
      {
        Header: 'Редактирование',
        accessor: 'edit',
        Cell: ({ row }) => (
          <button
            onClick={() => {
              console.log('Редактировать', row.original.name); // Список с Fast API BACK END
            }}
          >
            Редактировать
          </button>
        ),  
      },
      {
        Header: 'Сброс пароля',
        accessor: 'reset',
        Cell: ({ row }) => (
          <button
            onClick={() => {
              console.log('Сбросить пароль', row.original.name); // Список с Fast API BACK END
            }}
          >
            Сбросить
          </button>
        ),
      },
      {
        Header: 'Удаление',
        accessor: 'delete',
        Cell: ({ row }) => (
          <FaTrash
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={() => {
              console.log('Удалить', row.original.name); // Список с Fast API BACK END
            }}
          />
        ),  
      },
    ],
    [data, selectedRows]
  );

  // Подключаем useTable
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className='container'>
      <h1>Пользователи</h1>
      <input type='text' placeholder='Поиск' className='search_input'/>
      <button className='add_button' onClick={handleAddUser}>Добавить пользователя</button>

      <div className='main_table'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
