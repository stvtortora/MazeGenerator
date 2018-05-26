import Grid from '../components/grid';
import Node from '../components/node';
import dfs_bfs_solver from '../solvers/dfs_bfs_solver';import { drawPath } from '../util/canvas_util';

const generate_maze = (canvas, rootCoords, gridDimensions) => {
  //
  const grid = new Grid(gridDimensions);
  const root = new Node(rootCoords, null);
  const ctx = canvas.getContext('2d');
  let options = [root];

  const generationStep = () => {
    // if(options.length === 0) {
    //   window.clearInterval(timer);
    //   dfs_bfs_solver(ctx, root, grid.matrix[99][99], 'dfs');
    //   return;
    // };

    let randomIndex = Math.floor(Math.random() * options.length);
    let selected = options.splice(randomIndex, 1)[0];

    if(grid.canPlace(selected)) {
      grid.continuePath(selected, ctx);
      selected.generateChildren(grid);
      options = options.concat(selected.children);
    }
  }

  while(options.length > 0){
    generationStep();
  }
  debugger
  dfs_bfs_solver(ctx, root, grid.matrix[98][98], 'dfs', grid);

  // const timer = window.setInterval(generationStep, 0);
}

export default generate_maze;
