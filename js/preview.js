'use strict';

(function () {
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
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
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

  galleryClose.addEventListener('click', function () {
    closeGallery();
  });

  /**
   * Открыть превью изображения
   * @param {Object} picture - объект с данными фотографии
   */
  window.openPicturePreview = function (picture) {
    setPictureToGallery(picture);
    openGallery(picture);
  };
})();
