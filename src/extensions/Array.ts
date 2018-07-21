export {};

declare global {
  interface Array<T> {
    takeWhile (delegate: (element: T) => boolean): Array<T>;
  }
}

Array.prototype.takeWhile = (Array.prototype.takeWhile || function<T> (delegate: (element: T) => boolean): T[] {
  const result = [];

  for (const element of this) {
    if (delegate(element)) break;

    result.push(element);
  }

  return result;
});