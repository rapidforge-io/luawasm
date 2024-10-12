#include <stdio.h>

#if WASM_ENVIRONMENT
int tmpfile() {
  // TODO: implement tmpfile
}
#endif
int main() {
  printf("hello, world!\n");
  return 0;
}