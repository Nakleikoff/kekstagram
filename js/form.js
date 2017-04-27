'use strict';

(function () {
  /**
   * Минимальная длина комментария
   * @constant {number}
   */
  var COMMENT_MIN_LENGTH = 30;

  /**
   * Максимальная длина комментария
   * @constant {number}
   */
  var COMMENT_MAX_LENGTH = 100;

  var upload = document.querySelector('.upload');
  var uploadForm = upload.querySelector('.upload-form');
  var uploadFileInput = uploadForm.querySelector('#upload-file');
  var uploadCrop = upload.querySelector('.upload-overlay');
  var uploadCropCancel = uploadCrop.querySelector('.upload-form-cancel');
  var uploadCropSubmit = uploadCrop.querySelector('.upload-form-submit');

  var uploadComment = uploadCrop.querySelector('.upload-form-description');

  var uploadPreview = uploadCrop.querySelector('.filter-image-preview');

  /**
   * Нажать ESC на форме редактирования изображения
   * @param {KeyboardEvent} evt - событие
   */
  var onUploadCropEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE && evt.target.tagName !== 'TEXTAREA') {
      closeUploadCrop();
    }
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

  /**
   * Изменить фильтр изображения
   * @param {string} oldFilter - предыдущий фильтр
   * @param {string} newFilter - новый фильтр
   */
  var changeFilter = function (oldFilter, newFilter) {
    uploadPreview.classList.remove('filter-' + oldFilter);
    uploadPreview.classList.add('filter-' + newFilter);
  };

  /**
   * Изменить интенсивность фильтра
   * @param {Function} intensityFunction - функция для изменения интенсивности
   * @param {number} intensity - значение интенсивности
   */
  var changeIntensity = function (intensityFunction, intensity) {
    intensityFunction(uploadPreview, intensity);
  };

  /**
   * Изменить масштаб изображения
   * @param {number} scale - масштаб в процентах
   */
  var resizeImage = function (scale) {
    uploadPreview.style.transform = 'scale(' + scale / 100 + ')';
  };

  /**
   * Сбросить данные формы редактирования
   */
  var resetForm = function () {
    resetComment();
    window.elementFilters.reset();
    window.scale.reset();
  };

  /**
   * Проверить валидность комментария
   * @return {boolean}
   */
  var isCommentValid = function () {
    var length = uploadComment.value.length;
    return length >= COMMENT_MIN_LENGTH && length <= COMMENT_MAX_LENGTH;
  };

  /**
   * Сбросить текст комментария
   */
  var resetComment = function () {
    uploadComment.value = '';
  };

  /**
   * Проверить валидность формы
   * @return {boolean}
   */
  var isUploadFormValid = function () {
    var valid = true;
    if (isCommentValid()) {
      uploadComment.classList.remove('upload-form-error');
    } else {
      valid = false;
      uploadComment.classList.add('upload-form-error');
    }
    if (!window.scale.checkValidity()) {
      valid = false;
    }
    return valid;
  };

  uploadFileInput.addEventListener('change', function () {
    openUploadCrop();
  });

  uploadCropCancel.addEventListener('click', function () {
    closeUploadCrop();
  });

  uploadCropSubmit.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (isUploadFormValid()) {
      resetForm();
      closeUploadCrop();
    }
  });

  uploadForm.classList.remove('invisible');
  window.elementFilters.init(uploadCrop, changeFilter, changeIntensity);
  window.scale.init(uploadCrop, resizeImage);
  closeUploadCrop();
})();
