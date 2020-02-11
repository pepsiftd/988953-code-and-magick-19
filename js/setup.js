'use strict';

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

// показываем окно настройки
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// находим, куда записывать магов
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// собираем магов
var wizards = [];

for (var i = 0; i < 4; i++) {
  wizards[i] =
  {
    name: chooseRandomFromArray(FIRST_NAMES) + ' ' + chooseRandomFromArray(SECOND_NAMES),
    coatColor: chooseRandomFromArray(COAT_COLORS),
    eyesColor: chooseRandomFromArray(EYES_COLORS)
  }
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

// добавляем магов на страницу и показываем её
similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');
