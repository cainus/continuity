
var getConfiguration = require("../index");

describe("index", function(){

  it ("can get local git info", function(done){
    getConfiguration(function(err, config){
      failOnError(err);
      expect(config.commitId).
            to.match(/[0-9a-f]{40}/);
      expect(config.service).to.eql('localGit');
      expect(config.buildId).to.eql('NONE');
      expect(config.branch).to.eql('master');
      done();
    });
  });

});
