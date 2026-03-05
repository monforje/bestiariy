/*формируем массив для сортировки по двум уровням вида 
  [
    {column: номер столбца, по которому осуществляется сортировка, 
     direction: порядок сортировки (true по убыванию, false по возрастанию)
    }, 
    ...
   ]
*/
const createSortArr = (data) => {
  let sortArr = [];

  const sortSelects = data.getElementsByTagName("select");

  for (const item of sortSelects) {
    // получаем номер выбранной опции
    const keySort = item.value;
    // в случае, если выбрана опция Нет, заканчиваем формировать массив
    if (keySort == 0) {
      break;
    }
    // получаем порядок сортировки очередного уровня
    // имя флажка сформировано как имя поля SELECT и слова Desc
    const desc = document.getElementById(item.id + "Desc").checked;
    // очередной элемент массива - по какому столбцу и в каком порядке сортировать
    sortArr.push({ column: keySort - 1, direction: desc });
  }
  return sortArr;
};

// сохраняем строки таблицы до первого применения сортировки
let preSortRows = null;

const sortTable = (idTable, formData) => {
  // формируем управляющий массив для сортировки
  const sortArr = createSortArr(formData);

  //находим нужную таблицу
  let table = document.getElementById(idTable);

  // преобразуем строки таблицы в массив
  let rowData = Array.from(table.rows);

  // удаляем элемент с заголовками таблицы
  const headerRow = rowData.shift();

  // если во всех полях выбрано «Нет» — восстанавливаем порядок до сортировки
  if (sortArr.length === 0) {
    if (preSortRows) {
      table.innerHTML = "";
      table.append(headerRow);
      let tbody = document.createElement("tbody");
      preSortRows.forEach((item) => tbody.append(item));
      table.append(tbody);
      preSortRows = null;
    }
    return false;
  }

  // сохраняем исходный порядок строк перед первой сортировкой
  if (!preSortRows) {
    preSortRows = [...rowData];
  }

  //сортируем данные по всем уровням сортировки
  rowData.sort((first, second) => {
    for (let { column, direction } of sortArr) {
      const firstCell = first.cells[column].innerHTML;
      const secondCell = second.cells[column].innerHTML;

      // проверяем, являются ли значения числами
      const firstNum = parseFloat(firstCell);
      const secondNum = parseFloat(secondCell);
      const isNumeric = !isNaN(firstNum) && !isNaN(secondNum);

      // для чисел используем числовое сравнение, для строк – localeCompare
      const comparison = isNumeric
        ? firstNum - secondNum
        : firstCell.localeCompare(secondCell);

      // учитываем направление сортировки
      if (comparison !== 0) {
        return direction ? -comparison : comparison;
      }
    }
    return 0;
  });

  //выводим отсортированную таблицу на страницу
  table.append(headerRow);

  let tbody = document.createElement("tbody");
  rowData.forEach((item) => {
    tbody.append(item);
  });
  table.append(tbody);
};

const resetSort = (idTable, data) => {
  // восстанавливаем таблицу до применения сортировки
  if (preSortRows) {
    const table = document.getElementById(idTable);
    const headerRow = Array.from(table.rows).shift();

    table.innerHTML = "";
    table.append(headerRow);
    const tbody = document.createElement("tbody");
    preSortRows.forEach((item) => tbody.append(item));
    table.append(tbody);
    preSortRows = null;
  }

  // сбрасываем форму сортировки к начальному состоянию (как при загрузке страницы)
  const sortForm = document.getElementById("sort");

  // очищаем все SELECT
  for (const select of sortForm.getElementsByTagName("select")) {
    select.innerHTML = "";
  }

  // снимаем все флажки «по убыванию»
  for (const input of sortForm.getElementsByTagName("input")) {
    if (input.type === "checkbox") input.checked = false;
  }

  // перестраиваем поля со списком как при загрузке страницы
  setSortSelects(data[0], sortForm);
};
