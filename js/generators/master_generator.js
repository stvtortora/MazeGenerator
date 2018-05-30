import Grid from '../components/grid';
import Node from '../components/node';

const maze = (maze_generator, canvasId, rootCoords, gridDimensions, solve_algo, gen_algo) => {
  const canvas = document.getElementById(canvasId);

  canvas.addEventListener("click", ()=> {
    const grid = new Grid(gridDimensions);
    const root = new Node(rootCoords, null);
    // const root = grid.matrix[0][0];
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    maze_generator(grid, root, ctx, solve_algo, gen_algo);
  });
}


export default maze;
