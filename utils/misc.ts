export function* idGenerator() {
  let index = 0;
  while (true) yield index++;
}
