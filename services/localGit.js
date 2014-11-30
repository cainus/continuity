var exec = require('child_process').exec;

function getCommit(cb) {
  exec('git rev-parse HEAD', { cwd: __dirname }, function (err, stdout, stderr) {
    if (err){
      return cb(err);
    }
    if (stderr){
      return cb(new Error(stderr));
    }
    cb(null, stdout.split('\n').join(''));
  });
}

function getBranch(cb) {
  exec("git status", { cwd: __dirname }, function(err, stdout, stderr){
    if (err){
      return cb(err);
    }
    if (stderr){
      return cb(new Error(stderr));
    }

    console.log("stdout: ", stdout);
    var firstLine = stdout.split("\n")[0];
    console.log("firstLine: ", firstLine);
    var matches = firstLine.match(/^On branch (.+)$/);
    console.log('matches: ', matches);
    var branch = (matches || [])[1];
    if (!branch){
      console.log("status: ", stdout);
      return cb(new Error('branch could not be determined'));
    }
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
