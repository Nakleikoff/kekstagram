'use strict';

(function () {
  /**
   * Значение по умолчанию для масштаба изображения
   * @constant {number}
   */
  var FILTER_DEFAULT = 'none';

  var filters = null;
  var defaultFilter = null;
  var current = FILTER_DEFAULT;

  var onFilterChange = null;
  var onIntensityChange = null;

  /**
   * Тип функции для установки интенсивности фильтра на элемент
   * @typedef applyIntensity
   * @type {Function}
   * @param {Element} element - элемент для установки интенсивности
   * @param {number} value - значение интенсивности
   */

  /**
   * Объект с функциями описываюищими применение фильтра
   * @constant {Object<string, applyIntensity>}
   */
  var FILTERS_INTENSITY = {
    none: function (element, value) {
      element.style.filter = '';
    },
    chrome: function (element, value) {
      element.style.filter = 'grayscale(' + value / 100 + ')';
    },
    sepia: function (element, value) {
      element.style.filter = 'sepia(' + value / 100 + ')';
    },
    marvin: function (element, value) {
      element.style.filter = 'invert(' + value + '%)';
    },
    phobos: function (element, value) {
      element.style.filter = 'blur(' + value / 100 * 5 + 'px)';
    },
    heat: function (element, value) {
      element.style.filter = 'brightness(' + value / 100 * 3 + ')';
    },
  };

  /**
   * Установить элементы управления фильтрами
   * @param {Element} form - форма управления фильтрами
   */
  var initElements = function (form) {
    filters = form.querySelector('.upload-filter-controls');
    defaultFilter = filters.querySelector('#upload-filter-' + FILTER_DEFAULT);

    filters.addEventListener('change', function (evt) {
      applyFilter(evt.target.value);
    });
  };

  /**
   * Применить фильтр к изображению
   * @param {string} filter - выбранный фильтр
   */
  var applyFilter = function (filter) {
    if (typeof onFilterChange === 'function') {
      onFilterChange(current, filter);
    }
    current = filter;
    window.intensity.setVisible(current !== FILTER_DEFAULT);
    window.intensity.resetValue();
  };

  /**
   * Применить интенсивность фильтра
   * @param {number} value - текущая интенсивность
   */
  var applyIntensity = function (value) {
    if (typeof onIntensityChange === 'function') {
      onIntensityChange(FILTERS_INTENSITY[current], value);
    }
  };

  window.filters = {
    /**
     * Инициализивароть фильтры
     * @param {Element} form - элемент формы с фильтрами
     * @param {Function} filterCallback - функция для применения фильтра к элементу
     * @param {Function} intensityCallback - функция для применения интенсивности фильтра к элементу
     */
    init: function (form, filterCallback, intensityCallback) {
      initElements(form);
      onFilterChange = filterCallback;
      onIntensityChange = intensityCallback;
      window.intensity.init(form, applyIntensity);
      applyFilter(FILTER_DEFAULT);
    },

    /**
     * Сбросить фильтр изображения
     */
    reset: function () {
      defaultFilter.checked = true;
      applyFilter(FILTER_DEFAULT);
    }
  };
})();
