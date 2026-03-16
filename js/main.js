const baseInput = document.getElementById("base-input");
const topBaseInput = document.getElementById("top-base-input");
const heightInput = document.getElementById("height-input");
const angleInput = document.getElementById("angle-input");
const characteristicsSelect = document.querySelector(".characteristics");
const resultsParagraphs = document.querySelectorAll(".results p");
const errorsContainer = document.querySelector(".errors-container");
const clearButton = document.querySelector(".buttons button:nth-child(2)");
const heightSettings = heightInput ? heightInput.closest(".settings") : null;
const angleSettings = angleInput ? angleInput.closest(".settings") : null;
const modeBaseHeight = document.getElementById("mode-base-height");
const modeBaseAngle = document.getElementById("mode-base-angle");

// для отображения значений на картинке
const baseLabel = document.querySelector(".trapezid__base");
const topBaseLabel = document.querySelector(".trapezid__top-base");
const heightLabel = document.querySelector(".trapezid__height");
const angleLabel = document.querySelector(".trapezid__angle");

// функция для привязки значения инпута к тексту на картинке
function bindValueToLabel(input, label, suffix = "") {
	if (!input || !label) return;

	const render = () => {
		const value = input.value.trim();
		label.textContent = value ? `${value}${suffix}` : "";
	};

	input.addEventListener("input", render);
	render();
}

bindValueToLabel(baseInput, baseLabel);
bindValueToLabel(topBaseInput, topBaseLabel);
bindValueToLabel(heightInput, heightLabel);
bindValueToLabel(angleInput, angleLabel, "°");

// функция для очистки инпута и связанной с ним надписи
function clearInputAndLabel(input) {
	if (!input) return;
	input.value = "";
	input.dispatchEvent(new Event("input"));
}

function setSettingsVisible(settings, isVisible) {
	if (!settings) return;
	settings.style.display = isVisible ? "flex" : "none";
}

// функция для переключения режимов ввода
function updateInputMode() {
	if (!heightInput || !angleInput || !modeBaseHeight || !modeBaseAngle) return;

	const isBaseHeightMode = modeBaseHeight.checked;

	setSettingsVisible(heightSettings, isBaseHeightMode);
	setSettingsVisible(angleSettings, !isBaseHeightMode);

	if (isBaseHeightMode) {
		clearInputAndLabel(angleInput);
	} else {
		clearInputAndLabel(heightInput);
	}
}

if (modeBaseHeight && modeBaseAngle) {
	modeBaseHeight.addEventListener("change", updateInputMode);
	modeBaseAngle.addEventListener("change", updateInputMode);
	updateInputMode();
}

// функция для очистки всех полей и надписей
function clearAll() {
	clearInputAndLabel(baseInput);
	clearInputAndLabel(topBaseInput);
	clearInputAndLabel(heightInput);
	clearInputAndLabel(angleInput);

	if (characteristicsSelect) {
		Array.from(characteristicsSelect.options).forEach((option) => {
			option.selected = false;
		});
	}

	resultsParagraphs.forEach((paragraph) => {
		paragraph.textContent = "";
	});

	if (errorsContainer) {
		errorsContainer.textContent = "";
	}

	if (modeBaseHeight && modeBaseAngle) {
		modeBaseHeight.checked = true;
		modeBaseAngle.checked = false;
		updateInputMode();
	}
}

if (clearButton) {
	clearButton.addEventListener("click", clearAll);
}