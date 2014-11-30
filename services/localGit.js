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
  exec("git branch", { cwd: __dirname }, function(err, stdout, stderror){
    if (err){
      return cb(err);
    }
    if (stderr){
      return cb(new Error(stderr));
    }
    console.log("branches: ", branches);

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
