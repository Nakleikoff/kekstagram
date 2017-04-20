'use strict';

(function () {
  /**
   * Количество генерируемых изображений
   * @constant {number}
   */
  var NUMBER_OF_PICTURES = 25;

  var pictures = window.generatePictures(NUMBER_OF_PICTURES);

  window.renderPicturesList(pictures, window.onGalleryOpenerClick);
})();
