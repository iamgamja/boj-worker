const target = `























`.replace(/\s/g, '')


const fs = require('fs')

const solve = require('./solve.js')

const txt = fs.readFileSync('output.txt').toString().split('\n')

solve(txt, target)
solve(txt, target + '+!![]')
solve(txt, target + '-!![]')
solve(txt, target + '+[]')
solve(txt, target + '-[]')

fs.writeFileSync('output.txt', txt.join('\n'))

console.log('📏', txt.join('\n').length)
