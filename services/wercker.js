module.exports = {

  detect : function(env){
    if (!env) env = process.env;
    return !!env.WERCKER;
  },

  configuration : function(env){
    if (!env) env = process.env;
    return {
      service : 'wercker',
      buildId :  env.WERCKER_BUILD_ID,
      commitId : env.WERCKER_GIT_COMMIT,
      branch : env.WERCKER_GIT_BRANCH
    };
  }

};
