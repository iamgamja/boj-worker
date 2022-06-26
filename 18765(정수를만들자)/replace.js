const fs = require('fs')

const solve = require('./solve.js')

const txt = fs.readFileSync('output.txt').toString().replace(/\r\n/g, '\n').split('\n')

const firstLength = txt.join('\n').length


for (let i of txt) {
  console.count()

  const target = i.replace(
    '-[]',
    ''
  )

  // const target = i + '*[!![]+!![]]'

  // const target = i.slice(1)

  solve(txt, target,           false)
  solve(txt, target + '+!![]', false)
  solve(txt, target + '-!![]', false)
  solve(txt, target + '+[]',   false)
  solve(txt, target + '-[]',   false)

}

// for (let ii=0; ii<=1000; ii++) {
//   console.count('i')
//   const i = txt[ii]
//   for (let jj=ii; ii*jj<=1000 && jj<=1000; jj++) {
//     const j = txt[jj]
//     const targets = [
//       `${i}*${j}`,
//       `[${i}]*${j}`,
//       `${i}*[${j}]`,
//       `[${i}]*[${j}]`,

//       `${i.slice(0,-3)}*${j}`,
//       `[${i.slice(0,-3)}]*${j}`,
//       `${i.slice(0,-3)}*[${j}]`,
//       `[${i.slice(0,-3)}]*[${j}]`,

//       `${i}*${j.slice(0,-3)}`,
//       `[${i}]*${j.slice(0,-3)}`,
//       `${i}*[${j.slice(0,-3)}]`,
//       `[${i}]*[${j.slice(0,-3)}]`,

//       `${i.slice(0,-3)}*${j.slice(0,-3)}`,
//       `[${i.slice(0,-3)}]*${j.slice(0,-3)}`,
//       `${i.slice(0,-3)}*[${j.slice(0,-3)}]`,
//       `[${i.slice(0,-3)}]*[${j.slice(0,-3)}]`,
//     ]

//     for (let target of targets) {
//       solve(txt, target,           false)
//       solve(txt, target + '+!![]', false)
//       solve(txt, target + '-!![]', false)
//       solve(txt, target + '+[]',   false)
//       solve(txt, target + '-[]',   false)
//     }

//   }
// }


fs.writeFileSync('output.txt', txt.join('\n'))

console.log('📏', firstLength, '=>', txt.join('\n').length, '('+'-'+(firstLength-txt.join('\n').length)+')')
