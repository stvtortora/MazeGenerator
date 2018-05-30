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
        const node = new Node([i, j], null);
        row.push(node);
      }
      matrix.push(row);
    }

    return matrix;
  }

  inBounds(x, y){
    return (x >= 0 && x < this.xDim) && (y >= 0 && y < this.yDim)
  }

  openAt(x, y) {
    return !this.matrix[x][y].onPath;
  }

  continuePath(node, ctx) {
    this.matrix[node.x][node.y] = node;
    node.onPath = true;
    if(node.parent_connector) {
      node.parent_connector.onPath = true;
    }
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
        this.drawPath(ctx, node, '#ff2103');
      });
    }

    drawStep();
  }

  drawPath(ctx, node, color) {
    const multiplier = 10;
    ctx.fillStyle = color;
    if(node.parent_connector){
      ctx.fillRect(node.parent_connector.x * multiplier, node.parent_connector.y * multiplier, multiplier, multiplier);
    }
    ctx.fillRect(node.x * multiplier, node.y * multiplier, multiplier, multiplier);
  }
}

export default Grid;
