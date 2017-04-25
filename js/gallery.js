'use strict';

(function () {

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
    window.renderPicturesList(pictures, onPictureOpen);
  };

  window.getPictures(onGetPictures);
})();
