'use strict';

(function () {

  /**
   * Объект с функциями описываюищими применение фильтра
   * @constant {Object<string, Function(Array)>}
   */
  window.listFilters = {

    /**
     * Вернуть дефолтный порядок элементов
     * @param {Array} data - массив элементов
     * @return {Array} - отсортированный массив
     */
    popular: function (data) {
      return data;
    },

    /**
     * Вернуть 10 элементов отсортированных  в случаном порядке
     * @param {Array} data - массив элементов
     * @return {Array} - отсортированный массив
     */
    new: function (data) {
      var list = data.slice(0);
      return list.sort(function (first, second) {
        return 0.5 - Math.random();
      }).slice(10);
    },

    /**
     * Отсортировать элементы по количеству комментариев
     * @param {Array.<Object>} data - массив элементов
     * @return {Array.<Object>} - отсортированный массив
     */
    discussed: function (data) {
      var list = data.slice(0);
      return list.sort(function (first, second) {
        return first.comments.length - second.comments.length;
      });
    }
  };
})();
