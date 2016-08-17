function View (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
}

View.prototype.bindEvents = function () {
  const $cells = $('li');
  $cells.each( (idx, cell) => {
    let $currentCell = $(cell);
    let pos = this.convertPos(idx);
    this.makeMove($currentCell, pos);
  });
};

View.prototype.convertPos = function(idx) {
  return [ Math.floor(idx/3), idx % 3];
};

View.prototype.makeMove = function ($square, pos) {
  $square.on("click",(event) => {
    if (this.game.board.isEmptyPos(pos)) {
      let current = this.game.currentPlayer;
      this.game.playMove(pos);
      $square.attr("style", "background-color: white");
      $square.addClass(current);
      $square.text(current);
    } else {
      alert("Invalid Move!");
    }

    if (this.game.isOver()){
      const $footer = $("<h2></h2>");
      $('li').attr("style", "background-color: white; color: red");
      if(this.game.winner() === null){
        $footer.text(`It's a draw!`);
      }
      else{
        $footer.text(`You win, ${this.game.winner() }!`);
        let winner = $(`.${this.game.winner()}`);
        winner.attr("style", "background-color: green; color: white");
      }
      this.$el.append($footer);

    }
  });

};

View.prototype.setupBoard = function () {
  const $grid = $("<ul></ul>");
  $grid.addClass("group");
  let board = this.game.board.grid;
  board.forEach((row) => {
    row.forEach((col) => {
      let $cell = $("<li></li>");
      $cell.text("");
      $grid.append($cell);
    });

  });
  this.$el.append($grid);
};

module.exports = View;
