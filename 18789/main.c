#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <assert.h>
#include <time.h>
#include <dirent.h> 

#define SIZE (8*(14+1) + 1)


void writeFileWithPath(char path[], char s[]) {
  FILE *fp = fopen(path, "w");
  fputs(s, fp);
  fclose(fp);
}

char last[8][14] = {0, };
int score = -1;
bool loop = false;

void setLast(char s[SIZE]) {
  for (int i=0; i<8; i++) {
    for (int j=0; j<14; j++) {
      last[i][j] = s[i*14+i+j];
    }
  }
}

bool check(char x[][14], int n) {
  char s[4+1] = {0, };
  sprintf(s, "%d", n);
  int sl = strlen(s);
  for (int i=0; i<8; i++) {
    for (int j=0; j<14; j++) {
      if (x[i][j] != s[0]) continue;
      if (sl == 1) return true;
      int Q_1[8] = {i-1, i-1, i-1, i, i, i+1, i+1, i+1};
      int Q_2[8] = {j-1, j, j+1, j-1, j+1, j-1, j, j+1};
      for (int Q=0; Q<8; Q++) {
        int q = Q_1[Q];
        int qq = Q_2[Q];
        if (!(0<=q && q<8 && 0<=qq && qq<14 && x[q][qq] == s[1])) continue;
        if (sl == 2) return true;
        int W_1[8] = {q-1, q-1, q-1, q, q, q+1, q+1, q+1};
        int W_2[8] = {qq-1, qq, qq+1, qq-1, qq+1, qq-1, qq, qq+1};
        for (int W=0; W<8; W++) {
          int w = W_1[W];
          int ww = W_2[W];
          if (!(0<=w && w<8 && 0<=ww && ww<14 && x[w][ww] == s[2])) continue;
          if (sl == 3) return true;
          int E_1[8] = {w-1, w-1, w-1, w, w, w+1, w+1, w+1};
          int E_2[8] = {ww-1, ww, ww+1, ww-1, ww+1, ww-1, ww, ww+1};
          for (int E=0; E<8; E++) {
            int e = E_1[E];
            int ee = E_2[E];
            if (!(0<=e && e<8 && 0<=ee && ee<14 && x[e][ee] == s[3])) continue;
            return true;
          }
        }
      }
    }
  }
  return false;
}

int getRandomNumber() {
  return rand() % 10;
}

void setLastRandom() {
  for (int i=0; i<8; i++) {
    for (int j=0; j<14; j++) {
      char tmp[2] = {0, };
      sprintf(tmp, "%d", getRandomNumber());
      last[i][j] = tmp[0];
    }
  }
}

int getScore(char x[][14]) {
  int r = 0;
  while (check(x, r)) r++;
  r--;
  if (score < r) {
    memcpy(last, x, 112);
    score = r;
    loop = false;
    // get last
    char last_str[SIZE];
    for (int i=0; i<8; i++) {
      for (int j=0; j<14; j++) {
        last_str[i*14+i+j] = last[i][j];
      }
      last_str[i*14+i-1] = '\n';
    }
    writeFileWithPath("output.txt", last_str);
  }
  return r;
}



int compare(const void * a, const void * b) {
  return ( *(int*)a - *(int*)b );
}


int main(int argc, char* args[]) {
  srand(time(NULL));

  int count;
  if (argc == 1) count = 10000;
  else count = atoi(args[1]);

  // read output.txt
  char buffer[SIZE] = {0, };
  FILE *fp = fopen("output.txt", "r");
  fread(buffer, sizeof(buffer)-1, 1, fp);
  fclose(fp);
  setLast(buffer);
  
  getScore(last);

  for (int loopcount=0; loopcount<count; loopcount++) {
    loop = true;
    for (int i=0; i<8; i++) {
      printf("i: %d, score: %d\n", i, score);
      for (int j=0; j<14; j++) {
        for (int k=0; k<10; k++) {
          char last_copy[8][14];
          memcpy(last_copy, last, sizeof(last)); // copy last to last_copy
          // set K.toString()
          char k_str[2] = {0, };
          sprintf(k_str, "%d", k);
          last_copy[i][j] = k_str[0];
          getScore(last_copy);
        }
      }
    }
    if (loop) {
      printf("reset\n");
      char path[12] = "./save/\0\0\0\0\0";
      char tmp[4+1] = {0, };
      sprintf(tmp, "%d", score);
      memcpy(path+7, tmp, strlen(tmp));
      // get last
      char last_str[SIZE];
      for (int i=0; i<8; i++) {
        for (int j=0; j<14; j++) {
          last_str[i*14+i+j] = last[i][j];
        }
        last_str[i*14+i-1] = '\n';
      }
      writeFileWithPath(path, last_str);
      setLastRandom();
      score = getScore(last);
      // get last
      for (int i=0; i<8; i++) {
        for (int j=0; j<14; j++) {
          last_str[i*14+i+j] = last[i][j];
        }
        last_str[i*14+i-1] = '\n';
      }
      writeFileWithPath("output.txt", last_str);
      // clean files
      int filenames[10];
      DIR *d;
      struct dirent *dir;
      int count = 0;
      d = opendir("./save");
      if (d) {
        while ((dir = readdir(d)) != NULL) {
          filenames[count] = atoi(dir->d_name);
          count++;
        }
        closedir(d);
      }
      qsort( filenames, count, sizeof(int), compare );
      if (count > 5) {
        for (int i=0; i<count-5; i++) {
          char path[12] = "./save/\0\0\0\0\0";
          char tmp[4+1] = {0, };
          sprintf(tmp, "%d", filenames[i]);
          memcpy(path+7, tmp, strlen(tmp));
          remove(path);
        }
      }
    }
  }
}