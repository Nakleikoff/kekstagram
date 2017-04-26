'use strict';

(function () {

  /**
   * Код успешного ответа
   * @constant {number}
   */
  var SUCCESS_CODE = 200;

  /**
   * Объект с кодами ошибок
   * @constant {Object<number, string>}
   */
  var ERROR_CODES = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    403: 'Доступ запрещён',
    404: 'Ничего не найдено',
    500: 'Внутренняя ошибка сервера',
    502: 'Ошибочный шлюз',
    503: 'Сервис недоступен',
    504: 'Сервер не отвечает',
  };

  /**
   * Получить данные по запрошенному адресу
   * @param {string} url - url с данными
   * @param {Function} onSuccess - функция для обработки полученных данных
   * @param {Function} onError - функция для обработки ошибки
   */
  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        if (ERROR_CODES[xhr.status]) {
          onError(ERROR_CODES[xhr.status]);
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };
})();
