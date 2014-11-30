
var getConfiguration = require("../index");

describe("index", function(){

  if (process.env.NODE_ENV == 'test'){
    it ("can get local git info", function(done){
      getConfiguration(function(err, config){
        failOnError(err);
        expect(config.commitId).
              to.match(/[0-9a-f]{40}/);
        expect(config.service).to.eql('localGit');
        expect(config.buildId).to.eql(null);
        expect(config.branch).to.eql('master');
        done();
      });
    });
  }
  if (process.env.NODE_ENV == 'test-travis'){
    it ("can get travis info", function(done){
      getConfiguration(function(err, config){
        failOnError(err);
        expect(config.commitId).
              to.match(/[0-9a-f]{40}/);
        expect(config.service).to.eql('travis');
        expect(config.buildId).to.match(/[0-9]+/);
        expect(config.branch).to.match(/.+/);
        done();
      });
    });
  }

});
