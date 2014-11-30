var jenkins = require("../../services/jenkins");

describe("jenkins service", function(){

  it ("can detect jenkins", function(){
    process.env.JENKINS_URL = "http://jenkins.jenkins.example/";
    expect(jenkins.detect()).to.be(true);
  });

  it ("can get service env info", function(){
    process.env.BUILD_NUMBER = '1234';
    process.env.GIT_COMMIT = '5678';
    process.env.GIT_BRANCH = 'master';
    expect(jenkins.configuration()).to.eql({
      service : 'jenkins',
      buildId :  '1234',
      commitId : '5678',
      branch : 'master'
    });
  });
});
