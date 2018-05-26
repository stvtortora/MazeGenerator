class Node {
  constructor(rootCoords, onPath) {
    this.x = rootCoords[0];
    this.y = rootCoords[1];
    this.onPath = onPath;
    this.parent = null;
    this.parent_connector = null;
    this.children = null;
    this.adjacentCoords = [
      [this.x + 2, this.y],
      [this.x - 2, this.y],
      [this.x, this.y + 2],
      [this.x, this.y - 2]
    ]
  }

  generateChildren(grid) {
    this.children = this.adjacentCoords.map(coords => {
      const child = new Node(coords, null);
      child.parent = this;
      const parent_connector = new Node ([(child.x + child.parent.x) / 2, (child.y + child.parent.y) / 2], null);
      child.parent_connector = parent_connector;

      return child;
    }).filter(child => {
      return grid.inBounds(child.x, child.y);
    });
  }

  removeChild(reject) {
    const newChildren = this.children.filter(child => {
      return child.x !== reject.x && child.y !== reject.y;
    });

    this.children = newChildren;
  }
}

export default Node;
