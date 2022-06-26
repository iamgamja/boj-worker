const target = `























`.replace(/\s/g, '')


const fs = require('fs')

const solve = require('./solve.js')

const txt = fs.readFileSync('output.txt').toString().split('\n')

const firstLength = txt.join('\n').length

solve(txt, target)
solve(txt, target + '+!![]')
solve(txt, target + '-!![]')
solve(txt, target + '+[]')
solve(txt, target + '-[]')

fs.writeFileSync('output.txt', txt.join('\n'))

console.log('📏', firstLength, '=>', txt.join('\n').length, '('+'-'+(firstLength-txt.join('\n').length)+')')
