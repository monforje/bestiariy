document.addEventListener("DOMContentLoaded", function () {
  createTable(buildings, "list");

  // ФОРМА ФИЛЬТРАЦИИ
  const filterForm = document.getElementById("filter");

  const filterBtn = document.getElementById("filterBtn");
  filterBtn.addEventListener("click", () => {
    resetSort("list", buildings);
    filterTable(buildings, "list", filterForm);
  });

  const clearBtn = document.getElementById("clearBtn");
  clearBtn.addEventListener("click", () => {
    resetSort("list", buildings);
    clearFilter("list", buildings, filterForm);
  });

  // ФОРМА СОРТИРОВКИ
  const sortForm = document.getElementById("sort");

  const sortBtn = document.getElementById("sortBtn");
  sortBtn.addEventListener("click", () => {
    sortTable("list", sortForm);
  });

  const resetSortBtn = document.getElementById("resetSortBtn");
  resetSortBtn.addEventListener("click", () => {
    resetSort("list", buildings);
  });

  setSortSelects(buildings[0], sortForm);

  const fieldsFirst = document.getElementById("fieldsFirst");
  fieldsFirst.addEventListener("change", function () {
    changeNextSelect(this, "fieldsSecond");
  });
});

// формирование полей элемента списка с заданным текстом и значением
const createOption = (str, val) => {
  let item = document.createElement("option");
  item.text = str;
  item.value = val;
  return item;
};

// формирование поля со списком
// параметры – массив со значениями элементов списка и элемент select
const setSortSelect = (arr, sortSelect) => {
  // создаем OPTION Нет и добавляем ее в SELECT
  sortSelect.append(createOption("Нет", 0));
  // перебираем массив со значениями опций
  arr.forEach((item, index) => {
    // создаем OPTION из очередного ключа и добавляем в SELECT
    // значение атрибута VALUE увеличиваем на 1, так как значение 0 имеет опция Нет
    sortSelect.append(createOption(item, index + 1));
  });
};

// формируем поля со списком для многоуровневой сортировки
const setSortSelects = (data, dataForm) => {
  // выделяем ключи словаря в массив
  const head = Object.keys(data);

  // находим все SELECT в форме
  const allSelect = dataForm.getElementsByTagName("select");

  for (const item of dataForm.elements) {
    // обрабатываем только SELECT элементы
    if (item.tagName !== "SELECT") continue;

    // формируем очередной SELECT
    setSortSelect(head, item);

    // все SELECT, кроме первого, сделать неизменяемым
    if (item !== allSelect[0]) {
      item.disabled = true;
    }
  }
};

// настраиваем поле для следующего уровня сортировки
const changeNextSelect = (curSelect, nextSelectId) => {
  let nextSelect = document.getElementById(nextSelectId);

  nextSelect.disabled = false;

  // в следующем SELECT выводим те же option, что и в текущем
  nextSelect.innerHTML = curSelect.innerHTML;

  // удаляем в следующем SELECT уже выбранную в текущем опцию
  // если это не первая опция - отсутствие сортировки
  if (curSelect.value != 0) {
    nextSelect.remove(curSelect.value);
  } else {
    nextSelect.disabled = true;
  }
};
