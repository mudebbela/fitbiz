const http = require('http');
var path   = require('path')
const { spawn } = require('child_process')



const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
  console.log("received")
  
}

const runCommand = async (command, opts, quiet=false) => {
  let proc = spawn(command, opts, { stdio: [process.stdin, 'pipe', process.stderr] })
  let processOutput = ''
  if (!quiet) proc.stdout.pipe(process.stdout)
  proc.stdout.on('data', (data) => processOutput += data.toString())
  return new Promise((resolve, reject) => {
    proc.on('exit', (code) => {
      if (code === 0) resolve(processOutput)
      else reject(new Error(`command exited with status code ${code}`))
    })
  })
}

const server = http.createServer(requestListener);

runCommand('ls')
server.listen(8080);