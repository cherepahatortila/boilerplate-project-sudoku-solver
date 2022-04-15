const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
suite('Functional Tests', () => {
test('valid puzzle string', function(done){
chai.request(server)
.post('/api/solve') .send({puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200);  assert.equal(res.body.solution,'769235418851496372432178956174569283395842761628713549283657194516924837947381625');
done();
})
});
test('missing puzzle string:', function(done){
chai.request(server)
.post('/api/solve') .send({puzzle:''})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200);  assert.equal(res.body.error,'Required field missing');
done();
})
});
test('invalid characters:', function(done){
chai.request(server)
.post('/api/solve') .send({puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6a.'})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200);  assert.equal(res.body.error,'Invalid characters in puzzle');
done();
})
});
test('incorrect length', function(done){
chai.request(server)
.post('/api/solve') .send({puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.'})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200);  assert.equal(res.body.error,'Expected puzzle to be 81 characters long');
done();
})
});
test('cannot be solved', function(done){
chai.request(server)
.post('/api/solve') .send({puzzle:'..99.5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3...6.'})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200);  assert.equal(res.body.error,'Puzzle cannot be solved');
done();
})
});
test('placement with all fields', function(done){
chai.request(server)
.post('/api/check') .send({puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',coordinate:'A1',value:7})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200);  assert.equal(res.body.valid,true);
done();
})
});
test('placement with single placement conflict', function(done){
chai.request(server)
.post('/api/check') .send({puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',coordinate:'A1',value:2})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200); 
assert.deepEqual(res.body,{valid:false,
conflict:[ 'region' ]});
done();
})
});
test('placement with multiple placement conflict', function(done){
chai.request(server)
.post('/api/check') .send({puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',coordinate:'A1',value:4})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200); 
assert.deepEqual(res.body,{valid:false,
conflict:['column','region']});
done();
})
});
test('placement with all placement conflict', function(done){
chai.request(server)
.post('/api/check') .send({puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',coordinate:'A1',value:5})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200); 
assert.deepEqual(res.body,{valid:false,
conflict:['row','column','region']});
done();
})
});
test('placement with missing required fields', function(done){
chai.request(server)
.post('/api/check') .send({puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',coordinate:'',value:5})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200); 
assert.equal(res.body.error,'Required field(s) missing');
done();
})
});
test('placement with invalid characters', function(done){
chai.request(server)
.post('/api/check') .send({puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.6A.71...9......1945....4.37.4.3..6..',coordinate:'A1',value:5})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200); 
assert.equal(res.body.error,'Invalid characters in puzzle');
done();
})
});
test('placement with incorrect length', function(done){
chai.request(server)
.post('/api/check') .send({puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.6..71...9......1945....4.37.4.3.6..',coordinate:'A1',value:5})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200); 
assert.equal(res.body.error,'Expected puzzle to be 81 characters long');
done();
})
});
test('with invalid placement coordinate', function(done){
chai.request(server)
.post('/api/check') .send({puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.6..71...9......1945.....4.37.4.3.6..',coordinate:'A0',value:5})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200); 
assert.equal(res.body.error,'Invalid coordinate');
done();
})
});
test('placement with invalid placement value', function(done){
chai.request(server)
.post('/api/check') .send({puzzle:'..9..5.1.85.4....2432......1...69.83.9.....6.6..71...9......1945.....4.37.4.3.6..',coordinate:'A1',value:'A'})
.end(function(err,res){
  console.log(res.body)
assert.equal(res.status, 200); 
assert.equal(res.body.error,'Invalid value');
done();
})
});
});

