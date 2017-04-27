'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var template = document.querySelector('#picture-template').content;

  /**
   * Создать HTML-элемент для превью фотографии
   * @param {Object} picture - объект с данными фотографии
   * @param {Function} onPictureClick - функция, вызываемая по клику на картинку
   * @return {Element} - HTML-элемент превью фотографии
   */
  var renderPicture = function (picture, onPictureClick) {
    var pic = template.cloneNode(true).querySelector('.picture');
    pic.querySelector('img').src = picture.url;
    pic.querySelector('.picture-likes').textContent = picture.likes;
    pic.querySelector('.picture-comments').textContent = picture.comments.length;
    if (typeof onPictureClick === 'function') {
      pic.addEventListener('click', function (evt) {
        onPictureClick(evt, picture);
      });
    }
    return pic;
  };

  /**
   * Вывести превью массива фотографий
   * @param {Array} pictures - массив с объектами данных о фотографиях
   * @param {Function} onPictureClick - функция, вызываемая по клику на картинку
   */
  window.renderPicturesList = function (pictures, onPictureClick) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i], onPictureClick));
    }
    picturesContainer.innerHTML = '';
    picturesContainer.appendChild(fragment);
  };
})();
