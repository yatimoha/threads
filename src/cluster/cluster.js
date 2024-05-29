const [{ Server: h1 }, x] = [require('http'), require('express')];
const cluster = require('cluster');
const { Worker } = require('worker_threads');
const { availableParallelism } = require('node:os')

// const numCPUs = require('os').cpus().length;
const numCPUs = availableParallelism();
if (cluster.isMaster) {
  console.log('MAIN ' + process.pid);
  for (let i = 0; i < numCPUs; i++) cluster.fork();
  cluster.on('online', x => console.log('ONLINE ' + x.process.pid));
  cluster.on('exit', worker => console.log(`Worker ${worker.process.pid} died`)); // ```
} else {
  
  const PORT = 4321;
  const { log } = console;
  const hu = { 'Content-Type': 'text/html; charset=utf-8' };
  const app = x();
  
  app
    .use((r, rs, n) => rs.status(200).set(hu) && n())
    .use(x.static('.'))
    
    .get('/', r => {
      console.log('REQUEST ' + process.pid);
      r.res.send('OK ' + process.pid + '--' + Math.random());
    })
    .get('/blocking', r => {
      console.log('BL REQUEST ' + process.pid);
      ((y = 20000, x = Date.now()) => { while (Date.now() - x < y) ;})();
      r.res.send('DONE BLOCKING' + Math.random());
    })
    .get('/nonblocking', r => {
      console.log('NBL REQUEST ' + process.pid);
      const worker = new Worker('./src/pause/pause.js');
      
      worker.on('message', msg => r.res.send('Ответ ' + msg + Math.random() +  '!'));
    })
    .use(({ res: r }) => r.status(404).end('Пока нет!'))
    .use((e, r, rs, n) => rs.status(500).end(`Ошибка: ${e}`))
    
    .set('x-powered-by', false);
  const s = h1(app)
    .listen(process.env.PORT || PORT, () => log(PORT));
}