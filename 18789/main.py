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
    last = x.copy()
    last_score = r
    open('output.txt','w').write('\n'.join(last))
    open('score','w').write(str(r))
  return r

def check(x, n):
  for i in range(8):
    for j in range(14):
      s = str(n)
      # print(i,j)
      if not (x[i][j]==s[0]):continue
      if len(s)==1:return True
      for q,qq in (i-1,j-1),(i-1,j),(i-1,j+1),(i,j-1),(i,j+1),(i+1,j-1),(i+1,j),(i+1,j+1):
        if not (0<=q<8 and 0<=qq<14 and x[q][qq]==s[1]): continue
        if len(s)==2:return True
        for w,ww in (q-1,qq-1),(q-1,qq),(q-1,qq+1),(q,qq-1),(q,qq+1),(q+1,qq-1),(q+1,qq),(q+1,qq+1):
          if not (0<=w<8 and 0<=ww<14 and x[w][ww]==s[2]): continue
          if len(s)==3:return True
          for e,ee in (w-1,ww-1),(w-1,ww),(w-1,ww+1),(w,ww-1),(w,ww+1),(w+1,ww-1),(w+1,ww),(w+1,ww+1):
            if not (0<=e<8 and 0<=ee<14 and x[e][ee]==s[3]): continue
            return True
  return False




for i in range(8):
  print('i',i)
  for j in range(14):
    for k in range(10):
      lastcopy = last.copy()
      lastcopy[i] = lastcopy[i][:j] + str(k) + lastcopy[i][j+1:]
      # print()
      # print('\n'.join(lastcopy))
      # print()
      score(lastcopy)

print('\n'.join(last))
print(last_score)
