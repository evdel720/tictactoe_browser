const View = require("./ttt-view");
const Game = require("./game");


$( () => {
  const game = new Game();
  const $el = $('.ttt');
  const view = new View(game, $el);
  view.bindEvents();
});
