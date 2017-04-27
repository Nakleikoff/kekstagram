'use strict';

(function () {

  /**
   * Интервал повторного запуска функции
   * @constant {number}
   */
  var DEBOUNCE_INTERVAL = 500;

  /**
   * Значение фильтра по умолчанию
   * @constant {string}
   */
  var DEFAULT_FILTER = 'popular';

  var picturesList = null;
  var filters = document.querySelector('.filters');

  filters.addEventListener('change', function (evt) {
    window.debounce(function () {
      applyFilter(evt.target.value);
    }, DEBOUNCE_INTERVAL);
  });

  /**
   * Обработать открытие изображения
   * @param {Event} evt - событие
   * @param {Object} picture - изображение
   */
  var onPictureOpen = function (evt, picture) {
    evt.preventDefault();
    window.openPicturePreview(picture);
  };

  /**
   * Отрисовать полученные изображения
   * @param {Array} pictures - массив с изображениями
   */
  var onGetPictures = function (pictures) {
    picturesList = pictures;
    applyFilter(DEFAULT_FILTER);
    filters.classList.remove('hidden');
  };

  /**
   * Применить фильтр к списку изображений
   * @param {string} filter - название фильтра
   */
  var applyFilter = function (filter) {
    window.renderPicturesList(window.listFilters[filter](picturesList), onPictureOpen);
  };

  window.getPictures(onGetPictures);
})();
