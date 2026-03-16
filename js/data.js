const modeBaseHeight = document.getElementById("mode-base-height");
const modeBaseAngle = document.getElementById("mode-base-angle");

const baseInput = document.getElementById("base-input");
const topBaseInput = document.getElementById("top-base-input");
const heightInput = document.getElementById("height-input");
const angleInput = document.getElementById("angle-input");

const characteristicsSelect = document.querySelector(".characteristics");


// для отображения значений на картинке
function toNumber(value) {
	const normalized = value.trim().replace(",", ".");
	if (!normalized) return null;

	const number = Number(normalized);
	return Number.isFinite(number) ? number : null;
}

// функция для получения текущего режима ввода
function getMode() {
	if (modeBaseAngle && modeBaseAngle.checked) return "base-angle";
	if (modeBaseHeight && modeBaseHeight.checked) return "base-height";
	return null;
}

// функция для получения выбранных характеристик
function getSelectedCharacteristics() {
	if (!characteristicsSelect) return [];

	return Array.from(characteristicsSelect.options)
		.filter((option) => option.selected)
		.map((option) => option.value);
}

// функция для получения данных формы
export function getFormData() {
	const mode = getMode();

	const baseRaw = baseInput ? baseInput.value : "";
	const topBaseRaw = topBaseInput ? topBaseInput.value : "";
	const heightRaw = heightInput ? heightInput.value : "";
	const angleRaw = angleInput ? angleInput.value : "";

	const data = {
		mode,
		values: {
			base: toNumber(baseRaw),
			topBase: toNumber(topBaseRaw),
			height: null,
			angle: null,
		},
		raw: {
			base: baseRaw.trim(),
			topBase: topBaseRaw.trim(),
			height: heightRaw.trim(),
			angle: angleRaw.trim(),
		},
		calculate: getSelectedCharacteristics(),
	};

	if (mode === "base-height") {
		data.values.height = toNumber(heightRaw);
	}

	if (mode === "base-angle") {
		data.values.angle = toNumber(angleRaw);
	}

	return data;
}