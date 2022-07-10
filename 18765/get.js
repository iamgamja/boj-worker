target = process.argv[2]

if (target == 'random')
  target = Math.floor( Math.random()*1000 )

const x = require('fs').readFileSync('output.txt').toString().split('\n')

console.log(target, x[target].length, x[target])
