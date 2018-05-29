class DisjointSet {

  joined(node1, node2) {
    debugger
    return node1.setRoot() === node2.setRoot();
  }

  merge(set1, set2) {
    debugger
    set2.setRoot().setParent = set1.setRoot();
    debugger
  }
}

export default DisjointSet;
