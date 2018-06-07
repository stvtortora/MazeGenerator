class MinHeap {
  constructor(comparator, root) {
    this.comparator = comparator;
    this.array = [root];
    this.length = 1;
    this.removed = null;
  }

  shift() {
    this.swap(0, this.length - 1);
    this.removed = this.array.pop();
    this.length--;
    this.heapifyDown();
    return this.removed;
  }

  push(node) {
    this.array.push(node);
    this.length++;
    this.heapifyUp();
  }

  swap(x, y) {
    let temp = this.array[x];
    this.array[x] = this.array[y];
    this.array[y] = temp;
  }

  // heapify(direction) {
  //   let fromIndex;
  //   let toIndex;
  //   let condition;
  //
  //   if(direction === 'up') {
  //     fromIndex = this.length - 1;
  //     toIndex =  Math.floor((fromIndex - 1) / 2);
  //     condition = toIndex > -1 && this.comparator(this.array[fromIndex], this.array[toIndex]);
  //   } else {
  //     fromIndex = 0;
  //     let child1Index = 1;
  //     let child2Index = 2;
  //     let toIndex = this.priorityChildIndex(child1Index, child2Index);
  //     condition = toIndex && this.comparator(this.array[fromIndex], this.array[toIndex]);
  //   }
  //
  //   while(condition) {
  //     this.swap(toIndex, fromIndex);
  //
  //     fromIndex = toIndex;
  //     if(direction === 'up') {
  //       toIndex = Math.floor((fromIndex - 1) / 2);
  //     } else {
  //       child1Index = (toIndex * 2) + 1;
  //       child2Index = (toIndex * 2) + 2;
  //       toIndex = this.priorityChildIndex(child1Index, child2Index);
  //     }
  //   }
  //
  // }

  heapifyUp() {
    let index = this.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    while(parentIndex > -1 && this.comparator(this.array[parentIndex], this.array[index])) {
      this.swap(parentIndex, index);
      index = parentIndex;
      parentIndex =  Math.floor((index - 1) / 2);
    }
  }

  heapifyDown() {
    let index = 0;
    let child1Index = 1;
    let child2Index = 2;
    let priorityChildIndex = this.priorityChildIndex(child1Index, child2Index);

    while(priorityChildIndex && this.comparator(this.array[index], this.array[priorityChildIndex])) {
      this.swap(index, priorityChildIndex);

      index = priorityChildIndex;
      child1Index = (priorityChildIndex * 2) + 1;
      child2Index = (priorityChildIndex * 2) + 2;
      priorityChildIndex = this.priorityChildIndex(child1Index, child2Index);
    }
  }

  priorityChildIndex(index1, index2) {
    if(index1 < this.length) {

      if(index2 >= this.length) {
        return index1;
      }

      return this.array[index1].fVal < this.array[index2].fVal ? index1 : index2;
    }
    return null;
  }
}

export default MinHeap;
