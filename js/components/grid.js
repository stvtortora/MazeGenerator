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

  inBounds(x, y){
    return (x >= 0 && x < this.xDim) && (y >= 0 && y < this.yDim)
  }

  intersectsMaze(node) {
    if(this.matrix[node.x][node.y].visited) { return true };//if there is already a path node at this space
    node.adjacentCoords.forEach(coords => {
      if(this.inBounds(coords[0], coords[1])){

        const neighbor = this.matrix[coords[0]][coords[1]];

        if(neighbor !== node.parent && neighbor.visited) {
          return true;
        }
      }

    });
    return false;
  }

  continuePath(node, ctx) {
    node.visited = true;
    this.matrix[node.x][node.y] = node;
    this.drawPath(ctx, node, "#2ae950");
  }

  drawSolution (root, target, ctx) {
    const path = [target];
    while(path[0].x !== root.x || path[0].y !== root.y) {
      let node = path[0].parent;
      path.unshift(node);
    }

    const drawStep = () => {
      path.forEach(node => {
        debugger
        this.drawPath(ctx, node, '#ff2103')
      });
    }

    const timer = setInterval(drawStep, 0);
  }

  drawPath(ctx, node, color) {
    ctx.fillStyle = color;
    if(node.parent_connector){
      ctx.fillRect(node.parent_connector.x * 5, node.parent_connector.y * 5, 5, 5);
    }
    ctx.fillRect(node.x * 5, node.y * 5, 5, 5);
  }
}

export default Grid;
