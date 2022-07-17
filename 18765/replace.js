const fs = require('fs')

const solve = require('./solve.js')

const txt = fs.readFileSync('output.txt').toString().replace(/\r\n/g, '\n').split('\n')

const firstLength = txt.join('\n').length


function sans(target) {
  solve(txt, target,           false)
  solve(txt, target + '+!![]', false)
  solve(txt, target + '-!![]', false)
  solve(txt, target + '+[]',   false)
  solve(txt, target + '-[]',   false)
}

function primeFactors(n) {
  const answer = []

  for (let i = 2; i * i <= n; i += 1) {
    while (n % i === 0) {
      answer.push(i)
      n /= i
    }
  }

  if (n > 1)
    answer.push(n)
  return answer
}

/** @type {(...a: any[][]) => any[]} */
const cartesian =  (...a) => a.reduce(  (a, b) => a.map( c => b.map(d => [c, d].flat()) ).flat()  )

for (let i in txt) {
  console.log(i)

  cartesian(
    ...primeFactors(i)
      .map(x => txt[x])
      .map(x => ['['+x+']', x])
  ).map(
    x => x.join('*')
  ).forEach(sans)

  sans(
    txt[i].replace(
      '!-',
      ''
    )
  )

}

fs.writeFileSync('output.txt', txt.join('\n'))

console.log('📏', firstLength, '=>', txt.join('\n').length, '('+'-'+(firstLength-txt.join('\n').length)+')')
