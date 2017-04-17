'use strict';

(function () {
  /**
   * Количество генерируемых изображений
   * @constant {number}
   */
  var NUMBER_OF_PICTURES = 25;

  window.renderPicturesList(window.generatePictures(NUMBER_OF_PICTURES));
})();
