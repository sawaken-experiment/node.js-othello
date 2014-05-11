var app = require('http').createServer(handler);
var url = require('url');
var io = require('socket.io').listen(app);
var fs = require('fs');
var othello = require('./othello.js');
var page = require('./page.js');

app.listen(8080);

var GAME;
initGame();

io.sockets.on('connection', function(socket){
  socket.on('enter room', function(){
    var game = GAME, player = game.players.length + 1;
    game.players.push(socket);

    socket.emit('accept', {player: player, board: game.board});

    socket.on('hand', function(hand){
      var x = parseInt(hand[0]), y = parseInt(hand[1]);
      var conds = {
	turn        : game.turn === player,
	emptySquare : othello.getOccupant(game.board, x, y) === 0,
	reversible  : othello.handReverseNum(game.board, game.turn, x, y) > 0
      }
      if( conds.turn && conds.emptySquare && conds.reversible){
	game.board = othello.hand(game.board, game.turn, x, y);
	game.turn  = othello.nextPlayer(game.board, game.turn);
	postBoard(game);
	if( game.turn === 0 )
	  gameEnd(game, othello.winner(game.board));
      }
    });

    socket.on('disconnect', function(){
      if(GAME.players[0] === socket)
	initGame();
      else
	gameEnd(game, othello.anotherPlayer(player));
    });

    if(game.players.length === 2){
      game.turn = 1;
      initGame();
      postBoard(game);
    }
  });
});


function handler (req, res) {
  var path = url.parse(req.url).pathname;
  page.urlhandler(path, res);
}

function initGame(){
  GAME = {
    players: [],
    board:   othello.genBoard(8),
    turn:    0
  }
}

function gameEnd(game, winner){
  game.players.map(function(player){
    player.emit('game end', {
      winner: winner,
      points: [othello.count(game.board, 1), othello.count(game.board, 2)]
    });
  });
}

function postBoard(game){
  game.players.map(function(player){ 
    player.emit('board', {board: game.board, turn: game.turn});
  });
}
