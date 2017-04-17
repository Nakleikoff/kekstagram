'use strict';

window.generatePictures = (function () {
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

  return generatePicturesList;
})();
