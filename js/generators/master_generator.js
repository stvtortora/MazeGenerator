import Grid from '../components/grid';
import Node from '../components/node';

const maze = (maze_generator, canvasId, rootCoords, gridDimensions, solve_algo, gen_algo) => {
  const grid = new Grid(gridDimensions);
  const root = new Node(rootCoords, null);
  // const root = grid.matrix[rootCoords[0]][rootCoords[1]];
  const canvas = document.getElementById(canvasId);
  canvas.addEventListener("click", ()=> {
    debugger
    maze_generator(grid, root, canvas, solve_algo, gen_algo);
  });
}


export default maze;
