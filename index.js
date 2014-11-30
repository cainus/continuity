var services = {
  circle : require('./services/circle'),
  codeship : require('./services/codeship'),
  drone : require('./services/drone'),
  jenkins : require('./services/jenkins'),
  semaphore : require('./services/semaphore'),
  travis : require('./services/travis'),
  wercker : require('./services/wercker')
};

var localGit = require('./services/localGit');


module.exports = function(cb){

  for(var name in services){
    var service = services[name];
    if (service.detect()){
      return cb(null, service.configuration());
    }
  }

  localGit.detect(function(err, isLocalGit){
    if (err){
      return cb(err);
    }
    if (!isLocalGit){
      return cb(new Error('configuration could not be determined'));
    }
    localGit.configuration(function(err, config){
      return cb(err, config);
    });
  });
};
