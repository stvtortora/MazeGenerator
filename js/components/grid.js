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

  canPlace(node) {
    return !this.matrix[node.x][node.y].onPath;
  }

  continuePath(node, ctx) {
    node.onPath = true;
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
