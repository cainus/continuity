expect = require('expect.js');

failOnError = function(val){
  if (!!val){
    throw val;
  }
};
