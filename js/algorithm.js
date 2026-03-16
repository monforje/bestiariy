import { getFormData } from "/js/data.js";
import { clearErrors, renderErrors, validateFormData } from "/js/errors.js";

const calculateButton = document.querySelector(".buttons button:first-child");

const diagonalsResult = document.querySelector(".results .diagonals");
const unknownPartiesResult = document.querySelector(".results .unknown_parties");
const perimeterResult = document.querySelector(".results .perimeter");
const heightResult = document.querySelector(".results .height");

// функция для конвертации градусов в радианы
function toRad(deg) {
	return (deg * Math.PI) / 180;
}

function round(value) {
	return Math.round(value * 100) / 100;
}

// функция для очистки результатов
function clearResults() {
	if (diagonalsResult) diagonalsResult.textContent = "";
	if (unknownPartiesResult) unknownPartiesResult.textContent = "";
	if (perimeterResult) perimeterResult.textContent = "";
	if (heightResult) heightResult.textContent = "";
}

// функция для построения геометрии трапеции на основе данных формы
function buildGeometry(formData) {
	const base = formData.values.base;
	const topBase = formData.values.topBase;
	if (!base || base <= 0) return null;
	if (!topBase || topBase <= 0 || topBase >= base) return null;

	const projection = (base - topBase) / 2;

	let trapezoidHeight = null;
	let angleDeg = null;

	if (formData.mode === "base-height") {
		if (!formData.values.height || formData.values.height <= 0) return null;
		trapezoidHeight = formData.values.height;
		angleDeg = (Math.atan(trapezoidHeight / projection) * 180) / Math.PI;
	}

	if (formData.mode === "base-angle") {
		const angle = formData.values.angle;
		if (!angle || angle <= 0 || angle >= 90) return null;
		angleDeg = angle;
		trapezoidHeight = projection * Math.tan(toRad(angleDeg));
	}

	if (!trapezoidHeight || trapezoidHeight <= 0) return null;

	const side = Math.sqrt(projection ** 2 + trapezoidHeight ** 2);
	const diagonal = Math.sqrt(((base + topBase) / 2) ** 2 + trapezoidHeight ** 2);
	const perimeter = base + topBase + side * 2;
	const heightToSide = base * Math.sin(toRad(angleDeg));

    // возвращаем все вычисленные характеристики трапеции
	return {
		topBase,
		side,
		diagonal,
		perimeter,
		heightToSide,
	};
}

// функция для отображения результатов на странице
function renderResults(geometry, selected) {
	clearResults();

	if (!geometry) return;

	if (selected.includes("diagonals") && diagonalsResult) {
		diagonalsResult.textContent = `Диагонали: d1 = d2 = ${round(geometry.diagonal)}`;
	}

	if (selected.includes("unknown_parties") && unknownPartiesResult) {
		unknownPartiesResult.textContent = `Неизвестные стороны: боковые = ${round(geometry.side)} и ${round(geometry.side)}`;
	}

	if (selected.includes("perimeter") && perimeterResult) {
		perimeterResult.textContent = `Периметр: P = ${round(geometry.perimeter)}`;
	}

	if (selected.includes("height") && heightResult) {
		heightResult.textContent = `Высота от основания к боковой стороне: ${round(geometry.heightToSide)}`;
	}
}

// основная функция для обработки нажатия на кнопку "Рассчитать"
function calculate() {
	const formData = getFormData();
	const validation = validateFormData(formData);

	if (!validation.isValid) {
		clearResults();
		renderErrors(validation.errors);
		return;
	}

	clearErrors();
	const geometry = buildGeometry(formData);

	if (!geometry) {
		clearResults();
		renderErrors(["Не удалось выполнить расчет. Проверьте введенные данные."]);
		return;
	}

	renderResults(geometry, formData.calculate || []);
}

if (calculateButton) {
	calculateButton.addEventListener("click", calculate);
}