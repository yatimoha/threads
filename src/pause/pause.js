const { parentPort } = require('worker_threads');
((y = 10000, x = Date.now()) => { while (Date.now() - x < y) ;})();
parentPort.postMessage('Done!');