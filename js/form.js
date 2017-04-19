'use strict';

window.initUploadForm = (function () {
  /**
   * Код клавишы ESC
   * @constant {number}
   */
  var ESC_KEY_CODE = 27;

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

  /**
   * Значение по умолчанию для масштаба изображения
   * @constant {number}
   */
  var FILTER_DEFAULT = 'none';

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

  var upload = document.querySelector('.upload');
  var uploadForm = upload.querySelector('.upload-form');
  var uploadFileInput = uploadForm.querySelector('#upload-file');
  var uploadCrop = upload.querySelector('.upload-overlay');
  var uploadCropCancel = uploadCrop.querySelector('.upload-form-cancel');
  var uploadCropSubmit = uploadCrop.querySelector('.upload-form-submit');

  var uploadComment = uploadCrop.querySelector('.upload-form-description');

  var uploadPreview = uploadCrop.querySelector('.filter-image-preview');
  var uploadFilters = uploadCrop.querySelector('.upload-filter-controls');
  var currentFilter;

  var resizeValue = uploadCrop.querySelector('.upload-resize-controls-value');
  var resizeInc = uploadCrop.querySelector('.upload-resize-controls-button-inc');
  var resizeDec = uploadCrop.querySelector('.upload-resize-controls-button-dec');

  var intensityControl = uploadFilters.querySelector('.upload-filter-level-pin');
  var intensityBar = uploadFilters.querySelector('.upload-filter-level-val');
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

  /**
   * Сбросить масштабирование изображения
   */
  var resetResize = function () {
    resizeValue.value = RESIZE_DEFAULT + '%';
    resizeImage(RESIZE_DEFAULT);
  };

  /**
   * Сбросить данные формы редактирования
   */
  var resetForm = function () {
    resetComment();
    resetFilter();
    resetResize();
  };

  /**
   * Проверить валидность масштаба
   * @return {boolean}
   */
  var isResizeValid = function () {
    var value = getResizeValue();
    return value >= RESIZE_MIN && value <= RESIZE_MAX && value % 2 === 0;
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
    if (isResizeValid()) {
      resizeValue.classList.remove('upload-form-error');
    } else {
      valid = false;
      resizeValue.classList.add('upload-form-error');
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


  resizeInc.addEventListener('click', onResizeIncClick);
  resizeDec.addEventListener('click', onResizeDecClick);

  uploadForm.classList.remove('invisible');
  //closeUploadCrop();
  openUploadCrop();

  var INTENSITY_DEFAULT = 100;
  var INTENSITY_MIN = 0;
  var INTENSITY_MAX = 100;

  var intensityLine = uploadFilters.querySelector('.upload-filter-level-line');
  var LINE_WIDTH = intensityLine.clientWidth;

  var intensity = INTENSITY_DEFAULT;

  var FILTERS_INTENSITY = {
    chrome: function (element, value) {
      element.style.filter = 'grayscale(' + value / 100 + ')';
    },
    sepia: function (element, value) {
      element.style.filter = 'sepia(' + value / 100 + ')';
    },
    marvin: function (element, value) {
      element.style.filter = 'invert(' + value + '%)';
    },
    phobos: function (element, value) {
      element.style.filter = 'blur(' + value / 100 * 5 + 'px)';
    },
    heat: function (element, value) {
      element.style.filter = 'brightness(' + value / 100 * 3 + ')';
    },
  };

  /**
   * Применить фильтр к изображению
   * @param {string} filter - выбранный фильтр
   */
  var applyFilter = function (filter) {
    if (currentFilter) {
      uploadPreview.classList.remove('filter-' + filter);
    }
    currentFilter = filter;
    uploadPreview.classList.add('filter-' + filter);
    updateIntensityControl(INTENSITY_DEFAULT);
    applyFilterIntensity(INTENSITY_DEFAULT);
  };

  /**
   * Сбросить фильтр изображения
   */
  var resetFilter = function () {
    if (!currentFilter) {
      return;
    }
    uploadPreview.classList.remove('filter-' + currentFilter);
    currentFilter = null;
    uploadFilters.querySelector('#upload-filter-' + FILTER_DEFAULT).checked = true;
  };

  /**
   * Изменить фильтр
   * @param {Event} evt - событие
   */
  var onFilterChange = function (evt) {
    applyFilter(evt.target.value);
  };

  var updateIntensityControl = function (value) {
    intensityControl.style.left = value + '%';
    intensityBar.style.width = value + '%';
  };

  var applyFilterIntensity = function (value) {
    if (currentFilter && FILTERS_INTENSITY[currentFilter]) {
      FILTERS_INTENSITY[currentFilter](uploadPreview, value);
    }
  };

  intensityControl.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var controlX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = controlX - moveEvt.clientX;
      intensity = Math.min(Math.max(intensity - shiftX / LINE_WIDTH * 100, INTENSITY_MIN), INTENSITY_MAX);

      controlX = moveEvt.clientX;
      updateIntensityControl(intensity);
      applyFilterIntensity(intensity);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  uploadFilters.addEventListener('change', onFilterChange);

})();
