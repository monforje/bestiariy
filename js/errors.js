const errorsContainer = document.querySelector(".errors-container");

// функция для очистки ошибок
export function clearErrors() {
  if (!errorsContainer) return;
  errorsContainer.textContent = "";
}

// функция для отображения ошибок
export function renderErrors(errors) {
  if (!errorsContainer) return;

  if (!errors || !errors.length) {
    errorsContainer.textContent = "";
    return;
  }

  errorsContainer.innerHTML = errors.map((error) => `<p>${error}</p>`).join("");
}

// функция для валидации данных формы
export function validateFormData(formData) {
  const errors = [];
  const { mode, values, calculate } = formData;

  if (!mode) {
    errors.push(
      "Выберите режим ввода: основание и высота или основание и угол.",
    );
  }

  if (values.base === null || values.base <= 0) {
    errors.push("Нижнее основание должно быть числом больше 0.");
  }

  if (values.topBase === null || values.topBase <= 0) {
    errors.push("Верхнее основание должно быть числом больше 0.");
  }

  if (
    values.base !== null &&
    values.base > 0 &&
    values.topBase !== null &&
    values.topBase >= values.base
  ) {
    errors.push("Верхнее основание должно быть меньше нижнего основания.");
  }

  if (mode === "base-height") {
    if (values.height === null || values.height <= 0) {
      errors.push("Высота должна быть числом больше 0.");
    }
  }

  if (mode === "base-angle") {
    if (values.angle === null) {
      errors.push("Угол должен быть числом.");
    } else if (values.angle <= 0 || values.angle >= 90) {
      errors.push("Угол должен быть больше 0 и меньше 90 градусов.");
    }
  }

  if (!calculate || !calculate.length) {
    errors.push("Выберите хотя бы одну характеристику для вычисления.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
