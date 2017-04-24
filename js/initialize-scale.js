'use strict';

(function () {
  /**
   * Минимальное значение масштаба изображения
   * @constant {number}
   */
  var RESIZE_MIN = 25;

  /**
   * Максимальное значение масштаба изображения
   * @constant {number}
   */
  var RESIZE_MAX = 100;

  /**
   * Шаг изменения масштаба изображения
   * @constant {number}
   */
  var RESIZE_STEP = 25;

  /**
   * Значение по умолчанию для масштаба изображения
   * @constant {number}
   */
  var RESIZE_DEFAULT = 100;

  var resizeValue = null;
  var resizeInc = null;
  var resizeDec = null;

  var onResize = null;

  /**
   * Установить элементы управления масштабированием
   * @param {Element} form - блок с элементами управления
   */
  var initElements = function (form) {
    resizeValue = form.querySelector('.upload-resize-controls-value');
    resizeInc = form.querySelector('.upload-resize-controls-button-inc');
    resizeDec = form.querySelector('.upload-resize-controls-button-dec');

    resizeInc.addEventListener('click', onResizeIncClick);
    resizeDec.addEventListener('click', onResizeDecClick);
  };

  /**
   * Получить масштаб изображения
   * @return {number} - масштаб
   */
  var getResizeValue = function () {
    return parseInt(resizeValue.value, 10);
  };

  /**
   * Нажать на кнопку увеличения масштаба
   */
  var onResizeIncClick = function () {
    applyResize(getResizeValue() + RESIZE_STEP);
  };

  /**
   * Нажать на кнопку уменьшения масштаба
   */
  var onResizeDecClick = function () {
    applyResize(getResizeValue() - RESIZE_STEP);
  };

  /**
   * Применить масштабирование
   * @param {number} value - процент масштабирования
   */
  var applyResize = function (value) {
    value = window.utils.clamp(value, RESIZE_MIN, RESIZE_MAX);
    resizeValue.value = value + '%';
    if (typeof onResize === 'function') {
      onResize(value);
    }
  };

  /**
   * Проверить валидность масштаба
   * @return {boolean}
   */
  var isResizeValid = function () {
    var value = getResizeValue();
    return value >= RESIZE_MIN && value <= RESIZE_MAX && value % 2 === 0;
  };

  window.scale = {
    /**
     * Инициализивароть масштабирование
     * @param {Element} form - элемент формы с масштабированием
     * @param {Function} callback - функция для применения масштабирования
     */
    init: function (form, callback) {
      initElements(form);
      onResize = callback;
    },

    /**
     * Проверить валидность масштабирования
     * @return {boolean}
     */
    checkValidity: function () {
      var valid = isResizeValid();
      resizeValue.classList.toggle('upload-form-error', !valid);
      return valid;
    },

    /**
     * Сбросить масштабирование элемента
     */
    reset: function () {
      applyResize(RESIZE_DEFAULT);
    }
  };
})();
