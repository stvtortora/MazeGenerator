import Grid from '../components/grid';
import Node from '../components/node';

//second argument was canvasId, now its the context
const maze = (maze_generator, ctx, width, height, rootCoords, gridDimensions, solve_algo, gen_algo) => {
  // const canvas = document.getElementById(canvasId);

  // canvas.addEventListener("click", ()=> {
    const grid = new Grid(gridDimensions);
    const root = new Node(rootCoords, null);
    // const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    maze_generator(grid, root, ctx, solve_algo, gen_algo);
  // });
}


export default maze;
