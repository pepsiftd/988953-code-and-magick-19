'use strict';

var drawBar = function (ctx, x, height, color, name, time) {
  // высчитываем координату от края canvas-а
  x += 150;
  // рисуем прямоугольник
  ctx.fillStyle = color;
  ctx.fillRect(x, 240 - height, 40, height);
  // подписываем имя снизу и время сверху
  ctx.fillStyle = 'black';
  ctx.fillText(name, x, 260, 60);
  ctx.fillText(Math.round(time), x, 230 - height);
};

// функция нахождения наибольшего значения в массиве
var getMaxOfArray = function (numArray) {
  return Math.max.apply(null, numArray);
};

var renderStatistics = function (ctx, names, times) {
  // тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  // окно
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);
  ctx.strokeRect(100, 10, 420, 270);

  // текст в окне победы
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // диаграмма
  var diagramHeight = 150;
  var hiScore = getMaxOfArray(times);

  for (var i = 0; i < names.length; i++) {
    var columnX = i * 90; // координата от левого края гистограммы
    var columnHeight = diagramHeight * times[i] / hiScore; // высота колонки в долях от максимального значения
    var color = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(234, 100%, ' + Math.random() * 100 + '%)';

    drawBar(ctx, columnX, columnHeight, color, names[i], times[i]);
  }
};
