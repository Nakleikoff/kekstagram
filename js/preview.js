'use strict';

/**
 * Нажать на элемент открывающий картинку
 * @param {Event} evt - событие
 * @param {Object} picture - событие
 */
window.onGalleryOpenerClick = (function () {
  /**
   * Код клавишы ESC
   * @constant {number}
   */
  var ESC_KEY_CODE = 27;

  var gallery = document.querySelector('.gallery-overlay');
  var galleryClose = gallery.querySelector('.gallery-overlay-close');

  /**
   * Подставить данные фотографии в блок
   * просмотра галереи
   * @param {Object} picture - объект с данными фотографии
   */
  var setPictureToGallery = function (picture) {
    gallery.querySelector('.gallery-overlay-image').src = picture.url;
    gallery.querySelector('.likes-count').textContent = picture.likes;
    gallery.querySelector('.comments-count').textContent = picture.comments.length;
  };

  /**
   * Нажать ESC при просмотре галереи
   * @param {KeyboardEvent} evt - событие
   */
  var onGalleryEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      closeGallery();
    }
  };

  /**
   * Открыть галерею
   */
  var openGallery = function () {
    gallery.classList.remove('invisible');
    document.addEventListener('keydown', onGalleryEscPress);
  };

  /**
   * Закрыть галерею
   */
  var closeGallery = function () {
    gallery.classList.add('invisible');
    document.removeEventListener('keydown', onGalleryEscPress);
  };

  /**
   * Нажать на элемент открывающий картинку
   * @param {Event} evt - событие
   * @param {Object} picture - объект с данными фотографии
   */
  var onGalleryOpenerClick = function (evt, picture) {
    evt.preventDefault();
    setPictureToGallery(picture);
    openGallery(picture);
  };

  galleryClose.addEventListener('click', function () {
    closeGallery();
  });

  return onGalleryOpenerClick;
})();
