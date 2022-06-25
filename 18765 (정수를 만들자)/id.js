const x = require('fs').readFileSync('output.txt').toString().split('\n')

const d = {}

for (let i in x) {
  d[i] = x[i]
}

const idx = +[...Object.entries(d)].sort((q,w)=>-q[1].length+w[1].length)[0][0]

console.log()
console.log(idx-1)
console.log(d[idx-1])
console.log(d[idx-1].length)
console.log()
console.log(idx)
console.log(d[idx])
console.log(d[idx].length)
console.log()
console.log(idx+1)
console.log(d[idx+1])
console.log(d[idx+1].length)
