'use strict';
(function () {
  var WIZARDS_AMOUNT = 4;

  var FIRST_NAMES =
  [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var SECOND_NAMES =
  [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var COAT_COLORS =
  [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS =
  [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLORS =
  [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var chooseRandomFromArray = function (array) {
    return array.length >= 1 ? array[Math.round(Math.random() * (array.length - 1))] : 0;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var createRandomWizardsArray = function (amount) {
    var wizardsArray = [];

    for (var i = 0; i < amount; i++) {
      wizardsArray[i] =
      {
        name: chooseRandomFromArray(FIRST_NAMES) + ' ' + chooseRandomFromArray(SECOND_NAMES),
        coatColor: chooseRandomFromArray(COAT_COLORS),
        eyesColor: chooseRandomFromArray(EYES_COLORS)
      };
    }

    return wizardsArray;
  };

  var fillFragment = function (array, fragment) {
    for (var j = 0; j < array.length; j++) {
      fragment.appendChild(renderWizard(array[j]));
    }
  };

  // находим, куда записывать магов
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // собираем магов
  var wizards = createRandomWizardsArray(WIZARDS_AMOUNT);
  var fragment = document.createDocumentFragment();
  fillFragment(wizards, fragment);

  // добавляем магов в div и показываем его
  similarListElement.appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');

  // окно настройки персонажа

  // ищем объекты управления окном настройки
  var setup = document.querySelector('.setup');
  var userWizardCoatColor = document.querySelector('.setup-wizard .wizard-coat');
  var coatColorInput = setup.querySelector('input[name="coat-color');
  var userWizardEyesColor = document.querySelector('.setup-wizard .wizard-eyes');
  var eyesColorInput = setup.querySelector('input[name="eyes-color');
  var userWizardFireball = document.querySelector('.setup-fireball-wrap');
  var fireballColorInput = setup.querySelector('input[name="fireball-color');

  // обработчики событий взаимодействия с элементами персонажа
  var wizardCoatClickHandler = function () {
    changeCoatColor();
  };

  var wizardEyesClickHandler = function () {
    changeEyesColor();
  };

  var fireballClickHandler = function () {
    changeFireballColor();
  };

  // функции для обработки сценариев взаимодействия с элементами персонажа

  var changeCoatColor = function () {
    var currentColor = userWizardCoatColor.style.fill;
    var randomColor = chooseRandomFromArray(COAT_COLORS);

    while (currentColor === randomColor) {
      randomColor = chooseRandomFromArray(COAT_COLORS);
    }

    userWizardCoatColor.style.fill = randomColor;
    coatColorInput.value = randomColor;
  };

  var changeEyesColor = function () {
    var currentColor = userWizardEyesColor.style.fill;
    var randomColor = chooseRandomFromArray(EYES_COLORS);

    while (currentColor === randomColor) {
      randomColor = chooseRandomFromArray(EYES_COLORS);
    }

    userWizardEyesColor.style.fill = randomColor;
    eyesColorInput.value = randomColor;
  };

  var convertHexToRgb = function (hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  };

  var changeFireballColor = function () {
    var currentColor = userWizardFireball.style.backgroundColor;
    var randomColor = chooseRandomFromArray(FIREBALL_COLORS);

    while (currentColor === convertHexToRgb(randomColor)) {
      randomColor = chooseRandomFromArray(FIREBALL_COLORS);
    }

    userWizardFireball.style.backgroundColor = randomColor;
    fireballColorInput.value = randomColor;
  };

  var initializeSetup = function () {
    userWizardCoatColor.addEventListener('click', wizardCoatClickHandler);
    userWizardEyesColor.addEventListener('click', wizardEyesClickHandler);
    userWizardFireball.addEventListener('click', fireballClickHandler);
  };

  var unloadSetup = function () {
    userWizardCoatColor.removeEventListener('click', wizardCoatClickHandler);
    userWizardEyesColor.removeEventListener('click', wizardEyesClickHandler);
    userWizardFireball.removeEventListener('click', fireballClickHandler);
  };

  window.setup = {
    initialize: initializeSetup,
    unload: unloadSetup
  }
})();
