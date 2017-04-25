'use strict';

(function () {

  /**
   * Значение фильтра по умолчанию
   * @constant {string}
   */
  var FILTER_DEFAULT = 'popular';

  /**
   * Объект с функциями описываюищими применение фильтра
   * @constant {Object<string, Function>}
   */
  var FILTERS = {
    popular: function () {
      return data;
    },
    new: function () {
      var list = data.slice(0);
      return list.sort(function (first, second) {
        return 0.5 - Math.random();
      }).slice(10);
    },
    discussed: function () {
      var list = data.slice(0);
      return list.sort(function (first, second) {
        return first.comments.length > second.comments.length ? 1 : -1;
      });
    }
  };

  var filters = document.querySelector('.filters');

  filters.addEventListener('change', function (evt) {
    applyFilter(evt.target.value);
  });

  var data = null;
  var onFilter = null;

  /**
   * Применить фильтр к данным
   * @param {string} filter - выбранный фильтр
   */
  var applyFilter = function (filter) {
    if (typeof onFilter === 'function') {
      window.debounce(function () {
        onFilter(FILTERS[filter]());
      });
    }
  };

  window.sorters = {
    /**
     * Инициализировать сортировку изображений
     * @param {Array} source - исходный массив с данными
     * @param {Function} callback - функция для рендера данных
     */
    init: function (source, callback) {
      filters.classList.remove('hidden');
      this.setData(source);
      onFilter = callback;
      this.reset();
    },

    /**
     * Обновить данные
     * @param {Array} source - исходный массив с данными
     */
    setData: function (source) {
      data = source;
    },

    /**
     * Сбросить фильтрацию данных
     */
    reset: function () {
      applyFilter(FILTER_DEFAULT);
    },
  };
})();
