module.exports = {

  detect : function(env){
    if (!env) env = process.env;
    return !!env.JENKINS_URL;
  },

  configuration : function(env){
    if (!env) env = process.env;
    return {
      service : 'jenkins',
      buildId :  env.BUILD_NUMBER,
      commitId : env.GIT_COMMIT,
      branch : env.GIT_BRANCH
    };
  }

};
