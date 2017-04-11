'use strict';

var COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var NUMBER_OF_PICTURES = 25;
var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

document.querySelector('.upload-overlay').classList.add('invisible');

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryClose = document.querySelector('.gallery-overlay-close');
var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content;

var getRandomItem = function (list) {
  return list[Math.floor(Math.random() * list.length)];
};

var getRandomComments = function (number) {
  var comments = [];
  for (var i = 0; i < number; i++) {
    comments.push(getRandomItem(COMMENTS_LIST));
  }
  return comments;
};

var generatePicture = function (i) {
  return {
    url: 'photos/' + i + '.jpg',
    likes: Math.round(Math.random() * 185 + 15),
    comments: getRandomComments(Math.round(Math.random()) + 1)
  };
};

var generatePicturesList = function (number) {
  var pictures = [];
  for (var i = 0; i < number; i++) {
    pictures[i] = generatePicture(i + 1);
  }
  return pictures;
};

var renderPicturePreview = function (picture) {
  var tpl = pictureTemplate.cloneNode(true);
  tpl.querySelector('img').src = picture.url;
  tpl.querySelector('.picture-likes').textContent = picture.likes;
  tpl.querySelector('.picture-comments').textContent = picture.comments.length;
  return tpl;
};

var renderPicturesList = function (pictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicturePreview(pictures[i]));
  }
  picturesContainer.appendChild(fragment);
};

var pictures = generatePicturesList(NUMBER_OF_PICTURES);

var setGalleryPicture = function (i) {
  if (!pictures[i]) {
    return false;
  }
  galleryOverlay.querySelector('.gallery-overlay-image').src = pictures[i].url;
  galleryOverlay.querySelector('.likes-count').textContent = pictures[i].likes;
  galleryOverlay.querySelector('.comments-count').textContent = pictures[i].comments.length;
  return true;
};

var onGalleryEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closeGallery();
  }
};

var openGallery = function () {
  galleryOverlay.classList.remove('invisible');
  document.addEventListener('keydown', onGalleryEscPress);
};

var closeGallery = function () {
  galleryOverlay.classList.add('invisible');
  document.removeEventListener('keydown', onGalleryEscPress);
};

renderPicturesList(pictures);

[].map.call(picturesContainer.querySelectorAll('.picture'), function (picture, i) {
  picture.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (setGalleryPicture(i)) {
      openGallery();
    }
  });
});

galleryClose.addEventListener('click', function () {
  closeGallery();
});

galleryClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    closeGallery();
  }
});
