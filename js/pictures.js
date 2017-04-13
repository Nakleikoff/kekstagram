'use strict';

/**
 * Массив случайных комментариев
 * @constant {Array}
 */
var COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!',
];

/**
 * Количество генерируемых изображений
 * @constant {number}
 */
var NUMBER_OF_PICTURES = 25;

/**
 * Код клавишы ESC
 * @constant {number}
 */
var ESC_KEY_CODE = 27;

var gallery = document.querySelector('.gallery-overlay');
var galleryClose = gallery.querySelector('.gallery-overlay-close');

var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content;

var upload = document.querySelector('.upload');
var uploadForm = upload.querySelector('.upload-form');
var uploadFileInput = uploadForm.querySelector('#upload-file');
var uploadCrop = upload.querySelector('.upload-overlay');
var uploadCropCancel = uploadCrop.querySelector('.upload-form-cancel');
var uploadCropSubmit = uploadCrop.querySelector('.upload-form-submit');

var uploadPreview = uploadCrop.querySelector('.filter-image-preview');
var uploadFilters = uploadCrop.querySelector('.upload-filter-controls');
var currentFilter;

/**
 * Получить случайный элемент массива
 * @param {Array} list - массив
 * @return {*} - элемент массива
 */
var getRandomItem = function (list) {
  return list[Math.floor(Math.random() * list.length)];
};

/**
 * Получить массив комментариев
 * @param {number} number - количество комментариев
 * @return {Array} - массив комментариев
 */
var getRandomComments = function (number) {
  var comments = [];
  for (var i = 0; i < number; i++) {
    comments.push(getRandomItem(COMMENTS_LIST));
  }
  return comments;
};

/**
 * Сгенерировать фотографию
 * @param {number} i - номер фотографии
 * @return {Object} - фотография
 */
var generatePicture = function (i) {
  return {
    url: 'photos/' + i + '.jpg',
    likes: Math.round(Math.random() * 185 + 15),
    comments: getRandomComments(Math.round(Math.random()) + 1)
  };
};

/**
 * Сгенерировать массив фотографий
 * @param {number} number - количество фотографий
 * @return {Array} - массив с данными фотографий
 */
var generatePicturesList = function (number) {
  var pictures = [];
  for (var i = 0; i < number; i++) {
    pictures[i] = generatePicture(i + 1);
  }
  return pictures;
};

/**
 * Создать HTML-элемент для превью фотографии
 * @param {Object} picture - объект с данными фотографии
 * @return {Element} - HTML-элемент превью фотографии
 */
var renderPicturePreview = function (picture) {
  var pic = pictureTemplate.cloneNode(true).querySelector('.picture');
  pic.querySelector('img').src = picture.url;
  pic.querySelector('.picture-likes').textContent = picture.likes;
  pic.querySelector('.picture-comments').textContent = picture.comments.length;
  pic.addEventListener('click', function (evt) {
    evt.preventDefault();
    setPictureToGallery(picture);
    openGallery();
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
    fragment.appendChild(renderPicturePreview(pictures[i]));
  }
  picturesContainer.appendChild(fragment);
};

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
 * Нажать ESC на форме редактирования изображения
 * @param {KeyboardEvent} evt - событие
 */
var onUploadCropEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE && evt.target.tagName !== 'TEXTAREA') {
    closeUploadCrop();
  }
};

/**
 * Открыть форму загрузки
 */
var openUploadForm = function () {
  uploadForm.classList.remove('invisible');
};

/**
 * Открыть форму редактирования изображения
 */
var openUploadCrop = function () {
  uploadCrop.classList.remove('invisible');
  document.addEventListener('keydown', onUploadCropEscPress);
};

/**
 * Закрыть форму редактирования изображения
 */
var closeUploadCrop = function () {
  uploadCrop.classList.add('invisible');
  document.removeEventListener('keydown', onUploadCropEscPress);
};

galleryClose.addEventListener('click', function () {
  closeGallery();
});

uploadFileInput.addEventListener('change', function () {
  openUploadCrop();
});

uploadCropCancel.addEventListener('click', function () {
  closeUploadCrop();
});

uploadCropSubmit.addEventListener('click', function (evt) {
  evt.preventDefault();
  closeUploadCrop();
});

renderPicturesList(generatePicturesList(NUMBER_OF_PICTURES));
closeUploadCrop();
openUploadForm();

/**
 * Применить фильтр к изображению
 * @param {string} filter - выбранный фильтр
 */
var applyFilter = function (filter) {
  if (currentFilter) {
    uploadPreview.classList.remove(currentFilter);
  }
  currentFilter = 'filter-' + filter;
  uploadPreview.classList.add(currentFilter);
};

/**
 * Изменить фильтр
 * @param {Event} evt - событие
 */
var onFilterChange = function (evt) {
  applyFilter(evt.target.value);
};

uploadFilters.addEventListener('change', onFilterChange);


/**
 * Минимальное значение масштаба изображения
 * @constant {number}
 */
var RESIZE_MIN = 25;

/**
 * Максимальное значение масштаба изображения
 * @constant {number}
 */
var RESIZE_MAX = 100;

/**
 * Шаг изменения масштаба изображения
 * @constant {number}
 */
var RESIZE_STEP = 25;

/**
 * Значение по умолчанию для масштаба изображения
 * @constant {number}
 */
var RESIZE_DEFAULT = 100;

var resizeValue = uploadCrop.querySelector('.upload-resize-controls-value');
var resizeInc = uploadCrop.querySelector('.upload-resize-controls-button-inc');
var resizeDec = uploadCrop.querySelector('.upload-resize-controls-button-dec');

/**
 * Получить масштаб изображения
 * @return {number} - масштаб
 */
var getResizeValue = function () {
  return parseInt(resizeValue.value, 10);
};

/**
 * Изменить масштаб изображения
 * @param {number} scale - масштаб в процентах
 */
var resizeImage = function (scale) {
  uploadPreview.style.transform = 'scale(' + scale / 100 + ')';
};

/**
 * Нажать на кнопку увеличения масштаба
 */
var onResizeIncClick = function () {
  var value = getResizeValue();
  value = Math.min(value + RESIZE_STEP, RESIZE_MAX);
  resizeValue.value = value + '%';
  resizeImage(value);
};

/**
 * Нажать на кнопку уменьшения масштаба
 */
var onResizeDecClick = function () {
  var value = getResizeValue();
  value = Math.max(value - RESIZE_STEP, RESIZE_MIN);
  resizeValue.value = value + '%';
  resizeImage(value);
};

resizeInc.addEventListener('click', onResizeIncClick);
resizeDec.addEventListener('click', onResizeDecClick);
