'use strict';

(function () {
  /**
   * Url с данными изображений
   * @constant {string}
   */
  var DATA_URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram';

  /**
   * Получить массив фотографий
   * @param {Function} onGetPictures - функция для обработки полученных изображений
   */
  window.getPictures = function (onGetPictures) {
    window.load(DATA_URL, onGetPictures, window.message);
  };
})();
