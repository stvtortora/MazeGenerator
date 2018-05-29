class MinHeap {
  constructor(comparator, root) {
    this.comparator = comparator;
    this.array = [root];
    this.length = 1;
  }

  shift() {
    this.length--;
    return this.array.shift();
  }

  push(node) {
    this.array.push(node);
    this.length++;
    this.heapify();
  }

  swap(x, y) {
    let temp = this.array[x];
    this.array[x] = this.array[y];
    this.array[y] = temp;
  }

  heapify() {
    let index = this.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    while(parentIndex > -1 && this.comparator(this.array[parentIndex], this.array[index])) {
      this.swap(parentIndex, index);
      index = parentIndex;
      parentIndex =  Math.floor((index - 1) / 2);
    }
  }

}

export default MinHeap;
