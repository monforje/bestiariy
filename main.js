const cipherRaw = `_____ное,вс_____ойм_ноча___м_ысугт,б___змотло_о___а_зрабалс__ктнесы_ьт
б,ооанн_вшоы__бвнож_иртчвнаи_итноьт_и_мстосн_от_жа_ьмтенбонича_,в_аыме
задз`;

const keys = ["TL", "TR", "BL", "BR"];

// Функция для генерации базового маршрута по диагоналям матрицы
function baseRoute(n) {
  const route = [];
  for (let s = 0; s <= 2 * (n - 1); s++) {
    const iMin = Math.max(0, s - (n - 1));
    const iMax = Math.min(n - 1, s);
    for (let i = iMax; i >= iMin; i--) {
      route.push([i, s - i]);
    }
  }
  return route;
}

// Функция для зеркального отображения координат в зависимости от ключа
function mirror([r, c], key, n) {
  if (key === "TL") return [r, c];
  if (key === "TR") return [r, n - 1 - c];
  if (key === "BL") return [n - 1 - r, c];
  return [n - 1 - r, n - 1 - c];
}

// Функция для декодирования текста по заданному ключу
function decode(key, n, matrix) {
  let out = "";
  for (const p of baseRoute(n)) {
    const [r, c] = mirror(p, key, n);
    out += matrix[r][c];
  }
  return out.replace(/_+$/g, "").replace(/_/g, " ");
}

function main() {
  // Удаляем все пробельные символы из шифртекста
  const cipher = cipherRaw.replace(/\s+/g, "");

  // Вычисляем размер матрицы n x n
  const n = Math.ceil(Math.sqrt(cipher.length));

  // Проверяем, что длина шифртекста является квадратом n*n
  if (n * n !== cipher.length) {
    return
  }

  // Заполняем матрицу символами из шифртекста
  const matrix = [];
  [...cipher].forEach((char, i) => {
    const row = Math.floor(i / n);
    const col = i % n;

    if (!matrix[row]) {
      matrix[row] = [];
      for (let j = 0; j < n; j++) {
        matrix[row].push("_");
      }
    }
    matrix[row][col] = char;
  });

  // Декодируем и выводим результат для каждого ключа
  for (const key of keys) {
    console.log(`\nКлюч ${key}:`);
    console.log(decode(key, n, matrix));
  }
}

main();
