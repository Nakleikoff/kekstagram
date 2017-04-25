'use strict';

(function () {
  /**
   * Url с данными изображений
   * @constant {string}
   */
  var DATA_URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';

  /**
   * Получить массив фотографий
   * @param {Function} onPicturesLoad - функция для обработки полученных изображений
   */
  window.getPictures = function (onPicturesLoad) {
    window.load(DATA_URL, onPicturesLoad, window.message);
  };
})();
