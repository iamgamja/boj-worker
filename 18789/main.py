import random

last = open('output.txt','r').read().split()
last_score = int(open('score','r').read())

def score(x):
  r = 0
  while check(x,r):
    r += 1
  r -= 1
  global last, last_score
  if last_score < r:
    last = x
    last_score = r
    open('output.txt','w').write('\n'.join(last))
    open('score','w').write(str(r))
  return r

def check(x, n):
  for i in range(14):
    for j in range(8):
      s = str(n)
      if not (x[i][j]==s[0]):continue
      if len(s)==1:return True
      for q,qq in (i-1,j-1),(i-1,j),(i-1,j+1),(i,j-1),(i,j+1),(i+1,j-1),(i+1,j),(i+1,j+1):
        if not (0<=q<4 and 0<=qq<8 and x[q][qq]==s[1]): continue
        if len(s)==2:return True
        for w,ww in (q-1,qq-1),(q-1,qq),(q-1,qq+1),(q,qq-1),(q,qq+1),(q+1,qq-1),(q+1,qq),(q+1,qq+1):
          if not (0<=w<14 and 0<=ww<8 and x[w][ww]==s[2]): continue
          if len(s)==3:return True
          for e,ee in (w-1,ww-1),(w-1,ww),(w-1,ww+1),(w,ww-1),(w,ww+1),(w+1,ww-1),(w+1,ww),(w+1,ww+1):
            if not (0<=e<14 and 0<=ee<8 and x[e][ee]==s[3]): continue
            return True
  return False



a = []
for _ in range(14):
  a.append('')
  for _ in range(8):
    a[-1] += str( random.randint(0,9) )

print(score(a))
