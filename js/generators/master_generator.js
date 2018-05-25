import Grid from '../components/grid';
import Node from '../components/node';

const generate_maze = (canvas, rootCoords, gridDimensions) => {
  //
  const grid = new Grid(gridDimensions);
  const root = new Node(rootCoords, true);
  const ctx = canvas.getContext('2d');
  let options = [root];

  const step = () => {
    if(options.length === 0) {
      window.clearInterval(timer);
      return;
    };

    let randomIndex = Math.floor(Math.random() * options.length);
    let selected = options.splice(randomIndex, 1)[0];

    if(!grid.intersectsPath(selected)) {
      grid.continuePath(selected);
      drawPath(ctx, selected);
      let children = selected.generateChildren(grid)
      options = options.concat(selected.children);

    } else {
      selected.parent.removeChild(selected);
    }
  }

  const timer = window.setInterval(step, 0);

  const drawPath = (ctx, node) => {
    ctx.fillStyle = "#2ae950";

    if(node.parent_connector){
      debugger
      ctx.fillRect(node.parent_connector.x * 5, node.parent_connector.y * 5, 5, 5);
    }
    ctx.fillRect(node.x * 5, node.y * 5, 5, 5);
  }

}

export default generate_maze;
