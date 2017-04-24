'use strict';

(function () {
  var message = document.querySelector('.message-overlay');
  var messageContainer = message.querySelector('.message-overlay-container');

  message.addEventListener('click', function (evt) {
    evt.preventDefault();
    hideMessage();
  });

  /**
   * Закрыть сообщение
   */
  var hideMessage = function () {
    messageContainer.textContent = '';
    window.utils.setVisible(message, false);
    document.removeEventListener('keydown', onMessageEscPress);
  };

  /**
   * Нажать ESC при просмотре сообщения
   * @param {KeyboardEvent} evt - событие
   */
  var onMessageEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      hideMessage();
    }
  };

  /**
   * Показать сообщение
   * @param {string} text - текст сообщения
   */
  window.message = function (text) {
    messageContainer.textContent = text;
    window.utils.setVisible(message, true);
    document.addEventListener('keydown', onMessageEscPress);
  };
})();
