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

const cartesian = (...a) => {
  return a.reduce((a, b) => {
    return a.flatMap(d => {
      return b.map(e => [d, e].flat())
    })
  });
}
const cartesian2 = (...a) => {
  if (a.length === 0) return []
  if (a.length === 1) return a
  if (a.length === 2) return cartesian(...a)
  return cartesian2(cartesian(...a.slice(0,2)), ...a.slice(2))
}

for (let i in txt) {
  console.log(i)

  cartesian2(
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

  sans( txt[i] + '*[!![]+!![]]' )

  sans( txt[i].slice(1) )

}

fs.writeFileSync('output.txt', txt.join('\n'))

console.log('📏', firstLength, '=>', txt.join('\n').length, '('+'-'+(firstLength-txt.join('\n').length)+')')
