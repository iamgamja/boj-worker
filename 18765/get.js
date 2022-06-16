target = process.argv[2]

const x = require('fs').readFileSync('output.txt').toString().split('\n')

console.log(x[target].length, x[target])
