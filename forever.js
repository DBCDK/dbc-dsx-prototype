var monitor = require('forever-monitor');
var forever = require('forever');
var argv = require('yargs')
  .usage('Usage: node $0 <command> [options]')
  .example('node $0 -u youruid')
  .demand('u')
  .alias('u', 'uid')
  .nargs('u', 1)
  .describe('uid', 'Job identifier. If no job is found a running a new will be spawned with the given uid.')
  .argv;

function startProcess() {
  "use strict";
  console.log('Spawning new process with uid:', argv.uid);
  var child = new (monitor.Monitor)(__dirname + '/index.js', {uid: argv.uid});
  forever.startServer(child);
}

function restartProcess() {
  "use strict";
  console.log('Restarting process with uid:', argv.uid);
  forever.restart(__dirname + '/index.js', {uid: argv.uid});
}

forever.list(false, function(err, processes) {
  "use strict";
  if(err) {
    throw Error('Could not launch forever due to some error: ', err);
  }

  if(!processes) {
    startProcess();
  }
  else {
    var restarted = false;
    processes.forEach(function(process) {
      if(process.uid == argv.uid) {
        restarted = true;
        restartProcess();
      }
    });

    if(!restarted) {
      startProcess();
    }
  }
});

