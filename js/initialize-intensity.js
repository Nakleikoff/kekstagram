'use strict';

(function () {
  /**
   * Значение по умолчанию для интенсивности фильтра
   * @constant {number}
   */
  var INTENSITY_DEFAULT = 100;

  /**
   * Минимальное значение интенсивности фильтра
   * @constant {number}
   */
  var INTENSITY_MIN = 0;

  /**
   * Максимальное значение интенсивности фильтра
   * @constant {number}
   */
  var INTENSITY_MAX = 100;

  var intensity = INTENSITY_DEFAULT;

  var intensityPinX = null;
  var onChange = null;

  var intensityLevel = null;
  var intensityLine = null;
  var intensityBar = null;
  var intensityPin = null;

  /**
   * Установить элементы управления интенсивностью
   * @param {Element} form - элемент формы
   */
  var initElements = function (form) {
    intensityLevel = form.querySelector('.upload-filter-level');
    intensityLine = intensityLevel.querySelector('.upload-filter-level-line');
    intensityBar = intensityLine.querySelector('.upload-filter-level-val');
    intensityPin = intensityLine.querySelector('.upload-filter-level-pin');

    intensityPin.addEventListener('mousedown', onPinMouseDown);
  };

  /**
   * Нарисовать ползунок интенсивности фильтра
   * @param {number} value - значение интенсивности
   */
  var drawIntensityBar = function (value) {
    intensityPin.style.left = value + '%';
    intensityBar.style.width = value + '%';
  };

  /**
   * Нажать мышкой на ползунок
   * @param {Event} evt - событие
   */
  var onPinMouseDown = function (evt) {
    evt.preventDefault();
    intensityPinX = evt.clientX;

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  };

  /**
   * Переместить ползунок интенсивности фильтров
   * @param {Event} evt - событие
   */
  var onPinMouseMove = function (evt) {
    evt.preventDefault();

    var shift = intensityPinX - evt.clientX;
    intensityPinX = evt.clientX;

    var newIntensity = intensity - shift / intensityLine.clientWidth * 100;

    applyIntensity(window.utils.clamp(newIntensity, INTENSITY_MIN, INTENSITY_MAX));
  };

  /**
   * Применить значение интенсивности
   * @param {number} value - интенсивность
   */
  var applyIntensity = function (value) {
    intensity = value;
    drawIntensityBar(value);
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  /**
   * Отпустить ползунок интенсивности фильтров
   * @param {Event} evt - событие
   */
  var onPinMouseUp = function (evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  window.intensity = {
    /**
     * Инициализировать управление интенсивностью
     * @param {Element} form - элемент форм
     * @param {function} callback - колбэк на изменение интенсивности
     */
    init: function (form, callback) {
      initElements(form);
      onChange = callback;
    },

    /**
     * Сбросить интенсивность на значение по умолчанию
     */
    resetValue: function () {
      applyIntensity(INTENSITY_DEFAULT);
    },

    /**
     * Установить видимость блока управления интенсивностью
     * @param {boolean} visible - флаг видимости
     */
    setVisible: function (visible) {
      window.utils.setVisible(intensityLevel, visible);
    }
  };
})();
