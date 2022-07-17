module.exports = function solve(txt, target=false, debug=true) {
  if (!target) return;

  const [err, result] = (() => {
    try {
      return [null, eval(target)]
    } catch(e) {
      return [e, null]
    }
  })()

  if (err) {
    if(debug)console.error(err)
    return
  }

  
  if(debug)console.log('result:', result)

  let is = true


  if (typeof result != 'number') {
    if(debug)console.log('type', typeof result)
    is = false
  }

  if (result % 1) {
    if(debug)console.log('not int', result)
    is = false
  }

  if (result < 0) {
    if(debug)console.log('less then 0', result)
  }

  if (is) {
    if (txt[result]) {
      if (txt[result] == target) {
        if(debug)console.log('same')
        is = false
      }
      if (txt[result].length <= target.length) {
        if(debug)console.log('already', txt[result].length, '<=', target.length)
        is = false
      } else {
        txt[result] = target
        if(debug)console.log('!!', txt[result].length, target.length)
      }
    } else {
      if(debug)console.log('not found', result)
      is = false
    }
  }
  if(debug)console.log(is ? '✔️ Haee' : '❌ not', 'done', result, target.length)
  if(debug)console.log()

  if (is) {
    let targetcopy = target + '+!![]'
    while (solve(txt, targetcopy, debug)) {
      targetcopy += '+!![]'
    }

    targetcopy = target + '-!![]'
    while (solve(txt, targetcopy, debug)) {
      targetcopy += '-!![]'
    }

    targetcopy = target + '+[]'
    while (solve(txt, targetcopy, debug)) {
      targetcopy += '+[]'
    }

    targetcopy = target + '-[]'
    while (solve(txt, targetcopy, debug)) {
      targetcopy += '-[]'
    }
  }
  return is
}
