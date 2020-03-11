'use strict';
(function () {
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var SHADOW_SHIFT = 10;
  var GISTOGRAM_HEIGHT = 150;
  var PADDING_LEFT = 50;
  var PADDING_BOTTOM = 20;
  var LINE_HEIGHT = 20;
  var BAR_WIDTH = 40;
  var GAP = 50;
  var FONT_COLOR = '#000000';

  var renderCloud = function (ctx, x, y, color) {
    var w = CLOUD_WIDTH;
    var h = CLOUD_HEIGHT;

    ctx.beginPath();
    ctx.moveTo(x + 10 / 420 * w, y + 140 / 270 * h);
    ctx.bezierCurveTo(x - 30 / 420 * w, y + 310 / 270 * h, x + 70 / 420 * w, y + 265 / 270 * h, x + 300 / 420 * w, y + 260 / 270 * h);
    ctx.bezierCurveTo(x + 430 / 420 * w, y + 310 / 270 * h, x + 440 / 420 * w, y + 240 / 270 * h, x + 400 / 420 * w, y + 70 / 270 * h);
    ctx.bezierCurveTo(x + 420 / 420 * w, y - 30 / 270 * h, x + 340 / 420 * w, y + 10 / 270 * h, x + 140 / 420 * w, y + 10 / 270 * h);
    ctx.bezierCurveTo(x - 20 / 420 * w, y + 10 / 270 * h, x, y - 30 / 420 * w, x + 10 / 420 * w, y + 140 / 270 * h);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  };

  var drawBar = function (ctx, x, barHeight, color, name, time) {
    // высчитываем координату от края canvas-а
    x += (CLOUD_X + PADDING_LEFT);
    // рисуем прямоугольник
    ctx.fillStyle = color;
    ctx.fillRect(x, CLOUD_Y + CLOUD_HEIGHT - PADDING_BOTTOM - LINE_HEIGHT - barHeight, BAR_WIDTH, barHeight);
    // подписываем имя снизу и время сверху
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(name, x, CLOUD_Y + CLOUD_HEIGHT - PADDING_BOTTOM, BAR_WIDTH + 20);
    ctx.fillText(Math.round(time), x, CLOUD_Y + CLOUD_HEIGHT - PADDING_BOTTOM - LINE_HEIGHT - barHeight - 10, BAR_WIDTH + 20);
  };

  // функция нахождения наибольшего значения в массиве
  var getMaxOfArray = function (numArray) {
    return Math.max.apply(null, numArray);
  };

  window.renderStatistics = function (ctx, names, times) {
    // тень
    renderCloud(ctx, CLOUD_X + SHADOW_SHIFT, CLOUD_Y + SHADOW_SHIFT, 'rgba(0, 0, 0, 0.7)');

    // окно
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#FFFFFF');
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    // текст в окне победы
    ctx.fillStyle = FONT_COLOR;
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + 20, CLOUD_Y + 30);
    ctx.fillText('Список результатов:', CLOUD_X + 20, CLOUD_Y + 50);

    // диаграмма
    var maxTime = getMaxOfArray(times);

    for (var i = 0; i < names.length; i++) {
      var columnX = i * (BAR_WIDTH + GAP); // координата от левого края гистограммы
      var columnHeight = GISTOGRAM_HEIGHT * times[i] / maxTime; // высота колонки в долях от максимального значения
      var color = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(234, 100%, ' + Math.random() * 100 + '%)';

      drawBar(ctx, columnX, columnHeight, color, names[i], times[i]);
    }
  };
})();
