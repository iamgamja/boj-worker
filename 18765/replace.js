const fs = require('fs')

const solve = require('./solve.js')

const txt = fs
  .readFileSync('output.txt')
  .toString()
  .split('\n')

for (let i of txt) {
  const target = i.replace(
    '[+[]]-[]+!![]',
    '[+!![]]-[]'
  )

  solve(txt, target, true, 0)
  solve(txt, target + '+!![]', true, 0)
  solve(txt, target + '-!![]', true, 0)
  solve(txt, target + '+[]', true, 0)
  solve(txt, target + '-[]', true, 0)

}

fs.writeFileSync('output.txt', txt.join('\n'))

console.log('📏', txt.join('\n').length)
