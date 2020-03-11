'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = userDialog.querySelector('.setup-close');
  var nameInput = userDialog.querySelector('.setup-user-name');

  var setupOpenClickHandler = function () {
    openSetupWindow();
  };

  var setupCloseClickHandler = function () {
    closeSetupWindow();
  };

  var setupEscPressHandler = function (evt) {
    window.util.isEscEvent (evt, function () {
      if (evt.target !== nameInput) {
        closeSetupWindow();
      }
    })
  };

  var setupOpenEnterPressHandler = function (evt) {
    window.util.isEnterEvent (evt, openSetupWindow);
  };

  var setupCloseEnterPressHandler = function (evt) {
    window.util.isEnterEvent(evt, closeSetupWindow);
  };

  var openSetupWindow = function () {
    userDialog.classList.remove('hidden');
    setupCloseButton.addEventListener('click', setupCloseClickHandler);
    document.addEventListener('keydown', setupEscPressHandler);
    setupCloseButton.addEventListener('keydown', setupCloseEnterPressHandler);
    window.setup.initialize();
  };

  var closeSetupWindow = function () {
    userDialog.classList.add('hidden');
    setupCloseButton.removeEventListener('click', setupCloseClickHandler);
    document.removeEventListener('keydown', setupEscPressHandler);
    setupCloseButton.removeEventListener('keydown', setupCloseEnterPressHandler);
    window.setup.unload();
  };

  // обработчики нажатия на картинку аватара
  setupOpenButton.addEventListener('click', setupOpenClickHandler);
  setupOpenButton.addEventListener('keydown', setupOpenEnterPressHandler);
})();
