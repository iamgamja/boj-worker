const fs = require('fs')

const last = {
  last: fs.readFileSync('output.txt').toString().split('\n'),
  score: -1 // default
}

const loop = {
  loop: false
}

score(last.last)


function score(x) {
  let r = 0
  while (check(x, r)) r++
  r--
  if (last.score < r) {
    last.last = [...x]
    last.score = r
    loop.loop = false
    fs.writeFileSync('output.txt', last.last.join('\n'))
  }
  return r
}

function check(x, n) {
  for ( let i=0; i<8; i++ ) {
    for ( let j=0; j<14; j++ ) {
      let s = n.toString()
      if ( x[i][j] !== s[0] ) continue
      if ( s.length === 1 ) return true
      for ( let [q, qq] of [[i-1,j-1],[i-1,j],[i-1,j+1],[i,j-1],[i,j+1],[i+1,j-1],[i+1,j],[i+1,j+1]] ) {
        if ( !(0<=q && q<8 && 0<=qq && qq<14 && x[q][qq] === s[1]) ) continue
        if ( s.length === 2 ) return true
        for ( let [w, ww] of [[q-1,qq-1],[q-1,qq],[q-1,qq+1],[q,qq-1],[q,qq+1],[q+1,qq-1],[q+1,qq],[q+1,qq+1]] ) {
          if ( !(0<=w && w<8 && 0<=ww && ww<14 && x[w][ww] === s[2]) ) continue
          if ( s.length === 3 ) return true
          for ( let [e, ee] of [[w-1,ww-1],[w-1,ww],[w-1,ww+1],[w,ww-1],[w,ww+1],[w+1,ww-1],[w+1,ww],[w+1,ww+1]] ) {
            if ( !(0<=e && e<8 && 0<=ee && ee<14 && x[e][ee] === s[3]) ) continue
            return true
          }
        }
      }
    }
  }
  return false
}

while (1) {
  loop.loop = true
  for ( let i=0; i<8; i++ ) {
    console.debug('i', i, 'score', last.score)
    for ( let j=0; j<14; j++ ) {
      for ( let k=0; k<10; k++ ) {
        let last_copy = [...last.last]
        last_copy[i] = last_copy[i].slice(0,j) + k.toString() + last_copy[i].slice(j+1)
        score(last_copy)
      }
    }
  }
  if ( loop.loop ) {
    console.log('reset')
    fs.writeFileSync('./save/'+last.score, last.last.join('\n'))
    last.last = Array(8)
      .fill(0)
      .map(
        () => Array(14).fill(0).map(() => Math.floor(Math.random()*10)).join('')
      )
    last.score = score(last.last)
    fs.writeFileSync('output.txt', last.last.join('\n'))
    // clean files
    let filenames = fs.readdirSync('./save').sort((a,b) => +a - +b)
    if ( filenames.length > 5 ) {
      for ( let filename of filenames.slice(0,-5) ) {
        fs.unlinkSync('./save/'+filename)
      }
    }
  }
}
