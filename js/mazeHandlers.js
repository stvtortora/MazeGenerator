import maze from './generators/master_generator';
import primsDfsGenerator from './generators/prims_dfs_generator';
import randomized_dfs_generator from './generators/randomized_dfs_generator';
import changeButtonStatus from './button_util';
import maze_solver from './solvers/maze_solver';
import Grid from './components/grid';
import Node from './components/node';


const mazeHandlers = (canvas) => {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  let grid;
  let root;

  const generateMaze = (solve_algo, gen_algo, generator, rootCoords = [24, 24]) => {
    grid = new Grid([50, 50]);
    root = new Node(rootCoords, null);
    ctx.clearRect(0, 0, width, height);

    changeButtonStatus(true);

    generator(grid, root, ctx, solve_algo, gen_algo);
  }

  document.getElementById('prims_generator').addEventListener("click", () => {
    generateMaze(null, 'prims', primsDfsGenerator);
  })

  document.getElementById('randomized_dfs_generator').addEventListener("click", () => {
    generateMaze(null, null, randomized_dfs_generator);
  })

  document.getElementById('strict_dfs_generator').addEventListener("click", () => {
    generateMaze(null, 'dfs', primsDfsGenerator, [0, 0]);
  })

  document.getElementById('dfs_solver').addEventListener("click", () => {
    maze_solver(ctx, root, grid.matrix[48][48], grid, 'dfs');
  })

  document.getElementById('bfs_solver').addEventListener("click", () => {
    maze_solver(ctx, root, grid.matrix[48][48], grid, 'bfs');
  })

  document.getElementById('a*_solver').addEventListener("click", () => {
    maze_solver(ctx, root, grid.matrix[48][48], grid, 'a*');
  })
}

export default mazeHandlers;
