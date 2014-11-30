#continuity

###This is a work in progress!

###Get environment variables from multiple popular CI servers/services in a uniform form.

Supported services:

*circle-ci
*codeship
*drone
*jenkins
*semaphore
*travis
*wercker

Running locally with git outside of these environments is also
supported.

###Usage:

```javascript
var getConfig = require('continuity');
getConfig(function(err, config){
  // the environment configuration will be set here
};
```

The configuration object will look like this:
```javascript
{
  "service" : 'travis',
  "build"   : '12341234',
  'branch'  : 'master',
  'commitId' : 'c95d4e0d56b14bbb2eb0097f752291b472dd98c9'
}

```

There may be an additional `pullRequest` property if the environment
supports this property, and the commit is a pull-request.
