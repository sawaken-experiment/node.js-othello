var should = require('should');
var othello = require('../othello.js');

describe('othello', function(){
  it('genBoard', function(){
    othello.genBoard(4).should.eql([0, 0, 0, 0,
				    0, 1, 2, 0,
				    0, 2, 1, 0,
				    0, 0, 0, 0]);
  });

  it('size', function(){
    othello.size([0, 0, 0, 0]).should.equal(2);
  });

  it('square', function(){
    othello.square([0, 0, 0, 0]).should.equal(4);
  });

  it('nextPlayer', function(){
    othello.nextPlayer(othello.genBoard(4), 1).should.equal(2);
    othello.nextPlayer(othello.genBoard(4), 2).should.equal(1);

    var board1 = [0, 0, 0, 0,
		  1, 2, 2, 0,
		  0, 0, 0, 0,
		  0, 0, 0, 0];
    othello.nextPlayer(board1, 1).should.equal(1);
    othello.nextPlayer(board1, 2).should.equal(1);

    var board2 = [0, 0, 0, 0,
		  1, 1, 1, 1,
		  0, 0, 0, 0,
		  0, 0, 0, 0];
    othello.nextPlayer(board2, 1).should.equal(0);
    othello.nextPlayer(board2, 2).should.equal(0);
  });

  it('anotherPlayer', function(){
    othello.anotherPlayer(1).should.equal(2);
    othello.anotherPlayer(2).should.equal(1);
  });

  it('winner', function(){
    othello.winner([0, 1, 1, 1]).should.equal(1);
    othello.winner([0, 0, 0, 2]).should.equal(2);
    othello.winner([1, 2, 1, 2]).should.equal(0);
  });

  it('count', function(){
    othello.count([0, 1, 1, 1], 1).should.equal(3);
    othello.count([0, 1, 1, 1], 2).should.equal(0);
  });

  it('hands', function(){
    othello.hands(othello.genBoard(4), 1).should.equal(4);
    othello.hands(othello.genBoard(4), 2).should.equal(4);
  });

  it('hand', function(){
    othello.hand(othello.genBoard(4), 2, 0, 1).should.eql([0, 2, 0, 0,
							   0, 2, 2, 0,
							   0, 2, 1, 0,
							   0, 0, 0, 0]);

    var b1 = [0, 1, 1, 1,
	      0, 2, 2, 0,
	      2, 2, 2, 0,
	      0, 0, 0, 0];
    othello.hand(b1, 1, 3, 0).should.eql([0, 1, 1, 1,
					  0, 2, 1, 0,
					  2, 1, 2, 0,
					  1, 0, 0, 0]);
  });

  it('setPoint', function(){
    othello.setPoint([0, 0, 0, 1], 1, 0, 0).should.eql([1, 0, 0, 1]);
    othello.setPoint([0, 0, 0, 1], 2, 1, 1).should.eql([0, 0, 0, 2]);
  });

  it('handReserveDirection', function(){
    var b = [0, 0, 0, 1,
	     0, 0, 2, 1,
	     0, 2, 2, 1,
	     1, 1, 1, 1];

    othello.handReverseDirection(b, 1, 1, 1, 1, 0).should.eql([0, 0, 0, 1,
							       0, 0, 2, 1,
							       0, 1, 2, 1,
							       1, 1, 1, 1]);
  
    othello.handReverseDirection(b, 1, 1, 1, 0, 1).should.eql([0, 0, 0, 1,
							       0, 0, 1, 1,
							       0, 2, 2, 1,
							       1, 1, 1, 1]);

    othello.handReverseDirection(b, 1, 1, 1, 1, 1).should.eql([0, 0, 0, 1,
							       0, 0, 2, 1,
							       0, 2, 1, 1,
							       1, 1, 1, 1]);
  });

  it('handReverseNum', function(){
    var b = [0, 0, 0, 1,
	     0, 0, 2, 1,
	     0, 2, 2, 1,
	     1, 1, 1, 1];

    othello.handReverseNum(b, 1, 0, 2).should.eql(2);
    othello.handReverseNum(b, 1, 1, 1).should.eql(3);
    othello.handReverseNum(b, 1, 2, 0).should.eql(2);
  });

  it('handReverseDirectionNum', function(){
    var b = [0, 0, 0, 1,
	     0, 0, 2, 1,
	     0, 2, 2, 1,
	     1, 1, 1, 1];

    othello.handReverseDirectionNum(b, 1, 0, 2, 1, 0).should.eql(2);
    othello.handReverseDirectionNum(b, 1, 0, 2, 0, 1).should.eql(0);

    othello.handReverseDirectionNum(b, 1, 1, 1, 1, 0).should.eql(1);
    othello.handReverseDirectionNum(b, 1, 1, 1, 0, 1).should.eql(1);

    othello.handReverseDirectionNum(b, 1, 2, 0, 1, 0).should.eql(0);
    othello.handReverseDirectionNum(b, 1, 2, 0, 0, 1).should.eql(2);
  });

  it('toDrawFormat', function(){
    othello.toDrawFormat([0, 1, 2, 0]).should.eql([[0, 0, 0],
						   [0, 1, 1],
						   [1, 0, 2],
						   [1, 1, 0]]);
  });

  it('boardDiff', function(){
    othello.boardDiff([0, 1, 2, 0], [0, 2, 1, 1]).should.eql([[0, 1, 1, 2],
							      [1, 0, 2, 1],
							      [1, 1, 0, 1]]);
  });

  it('inSize', function(){
    othello.inSize([0, 0, 0, 0], -1).should.false
    othello.inSize([0, 0, 0, 0],  0).should.true
    othello.inSize([0, 0, 0, 0],  1).should.true
    othello.inSize([0, 0, 0, 0],  2).should.false
  });

  it('pointToIndex', function(){
    othello.pointToIndex([0, 0, 0, 0], 0, 0).should.equal(0);
    othello.pointToIndex([0, 0, 0, 0], 0, 1).should.equal(1);
    othello.pointToIndex([0, 0, 0, 0], 1, 0).should.equal(2);
    othello.pointToIndex([0, 0, 0, 0], 1, 1).should.equal(3);
  });

  it('indexToPoint', function(){
    othello.indexToPoint([0, 0, 0, 0], 0).should.eql([0, 0]);
    othello.indexToPoint([0, 0, 0, 0], 1).should.eql([0, 1]);
    othello.indexToPoint([0, 0, 0, 0], 2).should.eql([1, 0]);
    othello.indexToPoint([0, 0, 0, 0], 3).should.eql([1, 1]);
  });

  it('getOccupant', function(){
    othello.getOccupant([0, 1, 2, 0], 0, 0).should.equal(0);
    othello.getOccupant([0, 1, 2, 0], 0, 1).should.equal(1);
    othello.getOccupant([0, 1, 2, 0], 1, 0).should.equal(2);
    othello.getOccupant([0, 1, 2, 0], 2, 2).should.equal(-1);
  });

  it('maxes', function(){
    othello.maxes([-1, 1, 2, -2], function(e){ return Math.abs(e); }).should.eql([2, -2]);
  });
    
});
  
