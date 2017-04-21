'use strict';

(function () {

  /**
   * Объект со вспомогательными утилитами
   * @type {Utils}
   */
  window.utils = {
    /**
     * Код клавишы ESC
     * @constant {number}
     */
    ESC_KEY_CODE: 27,

    /**
     * Ограничить значение минимумом и максимумом
     * @param {number} value - значение
     * @param {number} min - минимально допустимое значение
     * @param {number} max - максимально допустимое значение
     * @return {number} - ограниченное значение
     */
    clamp: function (value, min, max) {
      return Math.min(Math.max(value, min), max);
    },

    /**
     * Изменить видимость элемента
     * @param {Element} element - элемент страницы
     * @param {boolean} visible - параметр видимости элемента
     */
    setVisible: function (element, visible) {
      element.classList.toggle('visible', visible);
    }
  };
})();
