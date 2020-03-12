'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = userDialog.querySelector('.setup-close');
  var nameInput = userDialog.querySelector('.setup-user-name');
  var dialogHandler = userDialog.querySelector('.upload');

  var setupOpenClickHandler = function () {
    openSetupWindow();
  };

  var setupCloseClickHandler = function () {
    closeSetupWindow();
  };

  var setupEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, function () {
      if (evt.target !== nameInput) {
        closeSetupWindow();
      }
    });
  };

  var setupOpenEnterPressHandler = function (evt) {
    window.util.isEnterEvent(evt, openSetupWindow);
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

  // обработка перетаскивания окна
  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var coords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: coords.x - moveEvt.clientX,
        y: coords.y - moveEvt.clientY
      };

      coords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';

    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var draggedClickHandler = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', draggedClickHandler);
        };
        dialogHandler.addEventListener('click', draggedClickHandler);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
