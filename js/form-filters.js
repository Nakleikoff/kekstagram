'use strict';

(function () {
  /**
   * Значение по умолчанию для масштаба изображения
   * @constant {number}
   */
  var FILTER_DEFAULT = 'none';

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

  var preview;
  var current = FILTER_DEFAULT;
  var intensity = INTENSITY_DEFAULT;

  var form = document.querySelector('.upload-filter');
  var filters = form.querySelector('.upload-filter-controls');
  var defaultFilter = filters.querySelector('#upload-filter-' + FILTER_DEFAULT);

  var intensityLevel = form.querySelector('.upload-filter-level');
  var intensityLine = intensityLevel.querySelector('.upload-filter-level-line');
  var intensityBar = intensityLine.querySelector('.upload-filter-level-val');
  var intensityPin = intensityLine.querySelector('.upload-filter-level-pin');

  /**
   * Применить фильтр к изображению
   * @param {string} filter - выбранный фильтр
   */
  var applyFilter = function (filter) {
    preview.classList.remove('filter-' + current);
    preview.classList.add('filter-' + filter);
    current = filter;
    if (current === FILTER_DEFAULT) {
      hideIntensityBar();
    } else {
      showIntensityBar();
    }
    intensity = INTENSITY_DEFAULT;
    applyIntensity(INTENSITY_DEFAULT);
  };

  /**
   * Сбросить фильтр изображения
   */
  var resetFilters = function () {
    defaultFilter.checked = true;
    applyFilter(FILTER_DEFAULT);
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
    drawIntensityBar(value);
    if (FILTERS_INTENSITY[current]) {
      FILTERS_INTENSITY[current](preview, value);
    }
  };

  /**
   * Показать ползунок интенсивности фильтра
   */
  var showIntensityBar = function () {
    intensityLevel.style.display = 'block';
  };

  /**
   * Скрыть ползунок интенсивности фильтра
   */
  var hideIntensityBar = function () {
    intensityLevel.style.display = 'none';
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
   * Инициализивароть фильтры
   * @param {Element} element - элемент для применения фильтров
   */
  var initFilters = function (element) {
    preview = element;
    applyFilter(FILTER_DEFAULT);
    filters.addEventListener('change', onFilterChange);

    intensityPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var controlX = evt.clientX;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shiftX = controlX - moveEvt.clientX;

        intensity = intensity - shiftX / intensityLine.clientWidth * 100;
        intensity = Math.min(Math.max(intensity, INTENSITY_MIN), INTENSITY_MAX);
        applyIntensity(intensity);
        controlX = moveEvt.clientX;
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.filters = {
    init: initFilters,
    reset: resetFilters
  };
})();
