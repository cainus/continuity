var localGit = require("../../services/localGit");

describe("localGit service", function(){

  it ("can detect localGit", function(done){
    localGit.detect(function(err, isLocalGit){
      failOnError(err);
      expect(isLocalGit).to.be(true);
      done();
    });
  });

  if (process.env.NODE_ENV == 'test'){
    // only run this locally
    it ("can get local git info", function(done){
      localGit.configuration(function(err, config){
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

});
