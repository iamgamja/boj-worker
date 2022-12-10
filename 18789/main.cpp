#include <array>
#include <fstream>
#include <iostream>
#include <random>
#include <sstream>
#include <vector>

using namespace std;

#define ROW 8
#define COL 14

array<array<int, COL>, ROW> table;

int getRandomInt() {
  random_device rd;
  mt19937 mt(rd());
  uniform_int_distribution<int> dist(0, 9);

  return dist(mt);
}

void initRandomTable() {
  for (int y = 0; y < ROW; y++) {
    for (int x = 0; x < COL; x++) {
      table[y][x] = getRandomInt();
    }
  }
}

void printTable() {
  for (int y = 0; y < ROW; y++) {
    for (int x = 0; x < COL; x++) {
      cout << table[y][x] << ' ';
    }
    cout << '\n';
  }
}

/**
 * @brief (x, y) 위치에서 시작해서, n을 읽을 수 있는지 여부를 판별합니다.
 * 이때, 뒤에서부터 읽습니다.
 */
bool checkIn(int n, int x, int y) {
  if (!((0 <= x && x < COL) && (0 <= y && y < ROW))) // (x, y)가 범위를 벗어남
    return false;

  int last_digit = n % 10;
  n /= 10;

  if (table[y][x] != last_digit)
    return false;
  if (n == 0)
    return true; // 전부 읽음

  for (int i : { -1, 0, 1 }) {   // x좌표를 이동시킬 값
    for (int j : { -1, 0, 1 }) { // y좌표를 이동시킬 값
      if (i == 0 && j == 0)
        continue; // 이동하지 않을 수 없음
      if (!((0 <= x + i && x + i < COL) && (0 <= y + j && y + j < ROW)))
        continue; // 이동한 좌표가 범위를 벗어남

      if (checkIn(n, x + i, y + j))
        return true; // 이동한 좌표에서, 남은 자릿수를 전부 읽음
    }
  }
  // 모든 방향을 확인했지만 읽지 못함
  return false;
}

bool check(int n) {
  for (int y = 0; y < ROW; y++) {
    for (int x = 0; x < COL; x++) {
      if (checkIn(n, x, y))
        return true;
    }
  }
  return false;
}

int score() {
  int tmp = 1;
  while (check(tmp))
    tmp++;

  return tmp - 1;
}

int main(void) {
  // initRandomTable();

  // printTable();

  // cout << "score: " << score() << '\n';

  while (1) {
    initRandomTable();
    int c = score();
    if (c > 1000) {
      printTable();
      cout << "score: " << score() << '\n';
    }
  }
}

// TODO: 더 나은 랜덤화 알고리즘 생각하기