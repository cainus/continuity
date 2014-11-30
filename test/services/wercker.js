var wercker = require("../../services/wercker");

describe("wercker service", function(){

  it ("can detect wercker", function(){
    process.env.WERCKER = "true";
    expect(wercker.detect()).to.be(true);
  });

  it ("can get service env info", function(){
    process.env.WERCKER_BUILD_ID = '1234';
    process.env.WERCKER_GIT_COMMIT = '5678';
    process.env.WERCKER_GIT_BRANCH = 'master';
    expect(wercker.configuration()).to.eql({
      service : 'wercker',
      buildId :  '1234',
      commitId : '5678',
      branch : 'master'
    });
  });
});
