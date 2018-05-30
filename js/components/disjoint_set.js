class DisjointSet {

  joined(node1, node2) {
    return node1.setRoot() === node2.setRoot();
  }

  merge(set1, set2) {
    set2.setRoot().setParent = set1.setRoot();
  }
}

export default DisjointSet;
