'use strict';

(function () {
  /**
   * Значение по умолчанию для масштаба изображения
   * @constant {number}
   */
  var FILTER_DEFAULT = 'none';

  /**
   * Объект с функциями описываюищими применение фильтра
   * @constant {Object}
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

  var preview = null;
  var filters = null;
  var defaultFilter = null;
  var current = FILTER_DEFAULT;

  /**
   * Установить элементы управления фильтрами
   * @param {Element} form - форма управления фильтрами
   */
  var initElements = function (form) {
    preview = form.querySelector('.filter-image-preview');
    filters = form.querySelector('.upload-filter-controls');
    defaultFilter = filters.querySelector('#upload-filter-' + FILTER_DEFAULT);

    filters.addEventListener('change', onFilterChange);
  };

  /**
   * Применить фильтр к изображению
   * @param {string} filter - выбранный фильтр
   */
  var applyFilter = function (filter) {
    preview.classList.remove('filter-' + current);
    preview.classList.add('filter-' + filter);
    current = filter;
    window.intensity.setVisible(current !== FILTER_DEFAULT);
    window.intensity.resetValue();
  };

  /**
   * Изменить фильтр
   * @param {Event} evt - событие
   */
  var onFilterChange = function (evt) {
    applyFilter(evt.target.value);
  };

  /**
   * Применить значение интенсивности фильтра
   * @param {number} value - значение интенсивности
   */
  var applyIntensity = function (value) {
    FILTERS_INTENSITY[current](preview, value);
  };

  window.filters = {
    /**
     * Инициализивароть фильтры
     * @param {Element} form - элемент формы с фильтрами
     */
    init: function (form) {
      initElements(form);
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
