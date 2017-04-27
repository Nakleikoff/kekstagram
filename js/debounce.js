'use strict';

(function () {

  var lastTimeout;

  /**
   * Устранить «дребегз» функции
   * @param {Function} func - «дребезжащая» функция
   * @param {number} interval - интервал повторного запуска функции
   */
  window.debounce = function (func, interval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, interval);
  };

})();
