var exec = require('child_process').exec;

function _command(cmd, cb) {
  exec(cmd, { cwd: __dirname }, function (err, stdout, stderr) {
    if (err){
      return cb(err);
    }
    if (stderr){
      return cb(new Error(stderr));
    }
    cb(null, stdout.split('\n').join(''));
  });
}

function getCommit(cb) {
  return _command('git rev-parse HEAD', cb);
}

function getBranch(cb) {
  exec("git branch", function(err, branches){
    if (err){
      return cb(err);
    }

    var branch = (branches.match(/^\* (\w+)/) || [])[1];
    return cb(null, branch);
  });
}



module.exports = {

  detect : function(cb){
    getCommit(function(err, commit){
      if (err){
        return cb(err);
      }
      return cb(null, true);
    });
  },

  configuration : function(cb){
    getCommit(function(err, commit){
      if (err){
        return cb(err);
      }
      getBranch(function(err, branch){
        if (err){
          return cb(err);
        }
        return cb(null, {
          service : 'localGit',
          buildId :  'NONE',
          commitId : commit,
          branch : branch
        });
      });
    });
  }

};
