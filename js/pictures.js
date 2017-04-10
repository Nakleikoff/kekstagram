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

document.querySelector('.upload-overlay').classList.add('invisible');

var galleryOverlay = document.querySelector('.gallery-overlay');
var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content;

var getRandomItem = function (list) {
  if (!list || !list.length) {
    return null;
  }
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
    pictures.push(generatePicture(i + 1));
  }
  return pictures;
};

var renderPicture = function (picture) {
  var element = pictureTemplate.cloneNode(true);
  element.querySelector('img').src = picture.url;
  element.querySelector('.picture-likes').textContent = picture.likes;
  element.querySelector('.picture-comments').textContent = picture.comments.length;
  return element;
};

var renderGalleryOverlay = function (picture) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = picture.url;
  galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
  galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;
  galleryOverlay.classList.remove('invisible');
};

var renderPicturesList = function (pictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  picturesList.appendChild(fragment);
};

var pictures = generatePicturesList(NUMBER_OF_PICTURES);
renderPicturesList(pictures);
renderGalleryOverlay(pictures[0]);
