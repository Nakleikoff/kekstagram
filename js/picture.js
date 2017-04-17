'use strict';

window.renderPicturesList = (function () {
  var picturesContainer = document.querySelector('.pictures');
  var template = document.querySelector('#picture-template').content;

  /**
   * Создать HTML-элемент для превью фотографии
   * @param {Object} picture - объект с данными фотографии
   * @return {Element} - HTML-элемент превью фотографии
   */
  var renderPicture = function (picture) {
    var pic = template.cloneNode(true).querySelector('.picture');
    pic.querySelector('img').src = picture.url;
    pic.querySelector('.picture-likes').textContent = picture.likes;
    pic.querySelector('.picture-comments').textContent = picture.comments.length;
    pic.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.preview.setPictureToGallery(picture);
      window.preview.openGallery();
    });
    return pic;
  };

  /**
   * Вывести превью массива фотографий
   * @param {Array} pictures - массив с объектами данных о фотографиях
   */
  var renderPicturesList = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    picturesContainer.appendChild(fragment);
  };

  return renderPicturesList;
})();
