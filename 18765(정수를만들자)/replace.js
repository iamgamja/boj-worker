const fs = require('fs')

const solve = require('./solve.js')

const txt = fs.readFileSync('output.txt').toString().replace(/\r\n/g, '\n').split('\n')

const firstLength = txt.join('\n').length


for (let i of txt) {
  console.count()

  const target = i.replace(
    '-![]',
    ''
  )

  // const target = i + '*[!![]+!![]]'

  // const target = i.slice(0, -3)

  solve(txt, target,           false)
  solve(txt, target + '+!![]', false)
  solve(txt, target + '-!![]', false)
  solve(txt, target + '+[]',   false)
  solve(txt, target + '-[]',   false)

}

fs.writeFileSync('output.txt', txt.join('\n'))

console.log('📏', firstLength, '=>', txt.join('\n').length, '('+'-'+(firstLength-txt.join('\n').length)+')')
