'use strict';

(function () {

  /**
   * Интервал повторного запуска функции
   * @constant {number}
   */
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  /**
   * Устранить «дребегз» функции
   * @param {Function} func - «дребезжащая» функция
   */
  window.debounce = function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
  };

})();
