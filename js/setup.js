'use strict';

var WIZARDS_AMOUNT = 4;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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

// ищем окно настройки
var userDialog = document.querySelector('.setup');

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

// ищем объекты управления окном настройки
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = userDialog.querySelector('.setup-close');
var nameInput = userDialog.querySelector('.setup-user-name');
var userWizardCoatColor = document.querySelector('.setup-wizard .wizard-coat');
var coatColorInput = userDialog.querySelector('input[name="coat-color');
var userWizardEyesColor = document.querySelector('.setup-wizard .wizard-eyes');
var eyesColorInput = userDialog.querySelector('input[name="eyes-color');
var userWizardFireball = document.querySelector('.setup-fireball-wrap');
var fireballColorInput = userDialog.querySelector('input[name="fireball-color');

// обработчики событий взаимодействия с окном настройки
var setupOpenClickHandler = function () {
  openSetupWindow();
};

var setupCloseClickHandler = function () {
  closeSetupWindow();
};

var setupEscPressHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    if (evt.target !== nameInput) {
      closeSetupWindow();
    }
  }
};

var setupOpenEnterPressHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    openSetupWindow();
  }
}

var setupCloseEnterPressHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    closeSetupWindow();
  }
}

var wizardCoatClickHandler = function () {
  changeCoatColor();
};

var wizardEyesClickHandler = function () {
  changeEyesColor();
};

var fireballClickHandler = function () {
  changeFireballColor();
};

// функции для обработки сценариев взаимодействия с окном настройки

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

var openSetupWindow = function () {
  userDialog.classList.remove('hidden');
  setupCloseButton.addEventListener('click', setupCloseClickHandler);
  document.addEventListener('keydown', setupEscPressHandler);
  setupCloseButton.addEventListener('keydown', setupCloseEnterPressHandler);
  userWizardCoatColor.addEventListener('click', wizardCoatClickHandler);
  userWizardEyesColor.addEventListener('click', wizardEyesClickHandler);
  userWizardFireball.addEventListener('click', fireballClickHandler);
};

var closeSetupWindow = function () {
  userDialog.classList.add('hidden');
  setupCloseButton.removeEventListener('click', setupCloseClickHandler);
  document.removeEventListener('keydown', setupEscPressHandler);
  setupCloseButton.removeEventListener('keydown', setupCloseEnterPressHandler);
  userWizardCoatColor.removeEventListener('click', wizardCoatClickHandler);
  userWizardEyesColor.removeEventListener('click', wizardEyesClickHandler);
  userWizardFireball.removeEventListener('click', fireballClickHandler);
};

// обработчики нажатия на картинку аватара
setupOpenButton.addEventListener('click', setupOpenClickHandler);
setupOpenButton.addEventListener('keydown', setupOpenEnterPressHandler)
