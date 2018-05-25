import Node from './node';

class Grid {
  constructor(gridDimensions){
    this.xDim = gridDimensions[0];
    this.yDim = gridDimensions[1];
    this.matrix = this.constructMatrix();
  }

  constructMatrix() {
    let matrix = [];

    for(let i = 0; i < this.yDim; i++) {
      let row = [];
      for(let j = 0; j < this.xDim; j++) {
        const node = new Node([j, i], null);
        row.push(node);
      }
      matrix.push(row);
    }

    return matrix;
  }


  intersectsPath(node) {
    if(this.matrix[node.x][node.y].path) { return true };//if there is already a path node at this space
    node.neighborCoords.forEach(coords => {
      if(this.inBounds(coords[0], coords[1])){

        const neighbor = this.matrix[coords[0]][coords[1]];

        if(neighbor !== node.parent && neighbor.path) {
          return true;
        }
      }

    });
    return false;
  }

  continuePath(node) {
    this.matrix[node.x][node.y] = node;
  }

  inBounds(x, y){
    return (x >= 0 && x < this.xDim) && (y >= 0 && y < this.yDim)
  }
}

export default Grid;
