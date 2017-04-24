'use strict';

(function () {

  /**
   * Отрисовать полученные изображения
   * @param {Array} pictures - массив с изображениями
   */
  var onGetPictures = function (pictures) {
    window.renderPicturesList(pictures, window.onGalleryOpenerClick);
  };

  window.getPictures(onGetPictures);
})();
