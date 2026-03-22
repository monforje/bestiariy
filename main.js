const cipher = `_____ное,вс_____ойм_ноча___м_ысугт,б___змотло_о___а_зрабалс__ктнесы_ьтб,ооанн_вшоы__бвнож_иртчвнаи_итноьт_и_мстосн_от_жа_ьмтенбонича_,в_аымезадз`;

// округляем длину строки до ближайшего квадрата
const N = Math.ceil(cipher.length ** 0.5);

console.log(`Длина строки: ${N}`);

// создаем матрицу N x N и заполняем ее символами
let matrix = [];

let index = 0;

for (let i = 0; i < N; i++) {
  matrix[i] = [];

  for (let j = 0; j < N; j++) {
    matrix[i][j] = cipher[index];
    index++;
  }
}

let keys = ["TL", "TR", "BL", "BR"];

let baseRoute = (n) => {
  // n - размер матрицы
  // идем по диагоналям: сумма i + j постоянна
  // (0,0)
  // (0,1) (1,0)
  // (0,2) (1,1) (2,0)
  // ...
  const path = [];
  // проход от 0 до 2*(n-1) - это количество диагоналей в матрице n x n
  for (let sum = 0; sum <= 2 * (n - 1); sum++) {
    // rowStart и rowEnd - это границы строк на диагонали
    const rowStart = Math.max(0, sum - (n - 1));
    const rowEnd = Math.min(n - 1, sum);

    for (let i = rowEnd; i >= rowStart; i--) {
      // i - строка, j - столбец
      const j = sum - i;
      path.push([i, j]);
    }
  }
  // получаем [[0,0], [0,1], [1,0], [0,2], [1,1], [2,0], ...]
  return path;
};

// Функция для зеркального отображения координат в зависимости от ключа
let mirror = ([r, c], key, n) => {
  if (key === "TL") return [r, c];
  if (key === "TR") return [r, n - 1 - c];
  if (key === "BL") return [n - 1 - r, c];
  return [n - 1 - r, n - 1 - c];
};

let decode = (key, n, matrix) => {
  let out = "";
  for (const p of baseRoute(n)) {
    const [r, c] = mirror(p, key, n);
    out += matrix[r][c];
  }
  return out.replace(/_+$/g, "").replace(/_/g, " ");
};

for (const key of keys) {
  console.log("\nКлюч: " + key);
  console.log(decode(key, N, matrix));
}
