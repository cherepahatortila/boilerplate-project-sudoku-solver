const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver=new Solver();

suite('UnitTests', () => {
test("handles a valid puzzle string of 81 characters", function(){ assert.isTrue(solver.validate('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'),'valid puzzlestring is true');
});
test('invalid characters (not 1-9 or .)', function(){ assert.equal(solver.validate('.a9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..').error,'Invalid characters in puzzle', 'letters are not appropriate in puzzlestring')
  });
test("81 characters", function(){ assert.equal(solver.validate('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6').error,"Expected puzzle to be 81 characters long", 'checking incorrect length');
});
test("handles a valid row placement", function(){ assert.equal(solver.checkRowPlacement([
  [
    '.', '.', '9',
    '.', '.', '5',
    '.', '1', '.'
  ],
  [
    '8', '5', '.',
    '4', '.', '.',
    '.', '.', '2'
  ],
  [
    '4', '3', '2',
    '.', '.', '.',
    '.', '.', '.'
  ],
  [
    '1', '.', '.',
    '.', '6', '9',
    '.', '8', '3'
  ],
  [
    '.', '9', '.',
    '.', '.', '.',
    '.', '6', '.'
  ],
  [
    '6', '2', '.',
    '7', '1', '.',
    '.', '.', '9'
  ],
  [
    '.', '.', '.',
    '.', '.', '.',
    '1', '9', '4'
  ],
  [
    '5', '.', '.',
    '.', '.', '4',
    '.', '3', '7'
  ],
  [
    '.', '4', '.',
    '3', '.', '.',
    '6', '.', '.'
  ]
], 0, "A", 7),'validRow','valid row');
});  
test("handles an invalid row placement", function(){ assert.equal(solver.checkRowPlacement([
  [
    '.', '.', '9',
    '.', '.', '5',
    '.', '1', '.'
  ],
  [
    '8', '5', '.',
    '4', '.', '.',
    '.', '.', '2'
  ],
  [
    '4', '3', '2',
    '.', '.', '.',
    '.', '.', '.'
  ],
  [
    '1', '.', '.',
    '.', '6', '9',
    '.', '8', '3'
  ],
  [
    '.', '9', '.',
    '.', '.', '.',
    '.', '6', '.'
  ],
  [
    '6', '2', '.',
    '7', '1', '.',
    '.', '.', '9'
  ],
  [
    '.', '.', '.',
    '.', '.', '.',
    '1', '9', '4'
  ],
  [
    '5', '.', '.',
    '.', '.', '4',
    '.', '3', '7'
  ],
  [
    '.', '4', '.',
    '3', '.', '.',
    '6', '.', '.'
  ]
], 0, "A", 9), 'conflictRow','invalid row');
}); 
test("handles a valid column placement", function(){ assert.equal(solver.checkColPlacement([
  [
    '.', '.', '9',
    '.', '.', '5',
    '.', '1', '.'
  ],
  [
    '8', '5', '.',
    '4', '.', '.',
    '.', '.', '2'
  ],
  [
    '4', '3', '2',
    '.', '.', '.',
    '.', '.', '.'
  ],
  [
    '1', '.', '.',
    '.', '6', '9',
    '.', '8', '3'
  ],
  [
    '.', '9', '.',
    '.', '.', '.',
    '.', '6', '.'
  ],
  [
    '6', '2', '.',
    '7', '1', '.',
    '.', '.', '9'
  ],
  [
    '.', '.', '.',
    '.', '.', '.',
    '1', '9', '4'
  ],
  [
    '5', '.', '.',
    '.', '.', '4',
    '.', '3', '7'
  ],
  [
    '.', '4', '.',
    '3', '.', '.',
    '6', '.', '.'
  ]
], 0, 1, 7),'validColumn','valid column');
});                                  
test("handles an invalid column placement", function(){ assert.equal(solver.checkColPlacement([
  [
    '.', '.', '9',
    '.', '.', '5',
    '.', '1', '.'
  ],
  [
    '8', '5', '.',
    '4', '.', '.',
    '.', '.', '2'
  ],
  [
    '4', '3', '2',
    '.', '.', '.',
    '.', '.', '.'
  ],
  [
    '1', '.', '.',
    '.', '6', '9',
    '.', '8', '3'
  ],
  [
    '.', '9', '.',
    '.', '.', '.',
    '.', '6', '.'
  ],
  [
    '6', '2', '.',
    '7', '1', '.',
    '.', '.', '9'
  ],
  [
    '.', '.', '.',
    '.', '.', '.',
    '1', '9', '4'
  ],
  [
    '5', '.', '.',
    '.', '.', '4',
    '.', '3', '7'
  ],
  [
    '.', '4', '.',
    '3', '.', '.',
    '6', '.', '.'
  ]
], 0, 1, 4),'conflictColumn','invalid column');
});                                  
test("handles a valid region placement", function(){ assert.equal(solver.checkRegionPlacement([
  [
    '.', '.', '9',
    '.', '.', '5',
    '.', '1', '.'
  ],
  [
    '8', '5', '.',
    '4', '.', '.',
    '.', '.', '2'
  ],
  [
    '4', '3', '2',
    '.', '.', '.',
    '.', '.', '.'
  ],
  [
    '1', '.', '.',
    '.', '6', '9',
    '.', '8', '3'
  ],
  [
    '.', '9', '.',
    '.', '.', '.',
    '.', '6', '.'
  ],
  [
    '6', '2', '.',
    '7', '1', '.',
    '.', '.', '9'
  ],
  [
    '.', '.', '.',
    '.', '.', '.',
    '1', '9', '4'
  ],
  [
    '5', '.', '.',
    '.', '.', '4',
    '.', '3', '7'
  ],
  [
    '.', '4', '.',
    '3', '.', '.',
    '6', '.', '.'
  ]
], 0, 1, 7),'validRegion','valid region');
});                                  
test("handles an invalid region placement", function(){ assert.equal(solver.checkRegionPlacement([
  [
    '.', '.', '9',
    '.', '.', '5',
    '.', '1', '.'
  ],
  [
    '8', '5', '.',
    '4', '.', '.',
    '.', '.', '2'
  ],
  [
    '4', '3', '2',
    '.', '.', '.',
    '.', '.', '.'
  ],
  [
    '1', '.', '.',
    '.', '6', '9',
    '.', '8', '3'
  ],
  [
    '.', '9', '.',
    '.', '.', '.',
    '.', '6', '.'
  ],
  [
    '6', '2', '.',
    '7', '1', '.',
    '.', '.', '9'
  ],
  [
    '.', '.', '.',
    '.', '.', '.',
    '1', '9', '4'
  ],
  [
    '5', '.', '.',
    '.', '.', '4',
    '.', '3', '7'
  ],
  [
    '.', '4', '.',
    '3', '.', '.',
    '6', '.', '.'
  ]
], 0, 1, 5),'conflictRegion','invalid region');
});
test('valid puzzle strings pass the solver', function(){ assert.isDefined(solver.solve('..9..5...8..4....2432......1...69.83.9.....6..2.71...9......1945....4.37.4.3..6..').solution, 'valid string shows solution')  
});
test("Solver returns solution for an incomplete puzzle",function(){ assert.notInclude(solver.solve('..9..5.1..5.4....2432......1....9.83.9.....6.62.71...9......1945....4.37.4.3..6..').solution,'.','solver completes the puzzle');
});
test('invalid puzzle strings fail the solver', function(){ assert.isDefined(solver.solve('..99.5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..').error, 'invalid string shows error');
}); 
});

