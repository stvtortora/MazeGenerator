import maze from './generators/master_generator';
import primsDfsGenerator from './generators/prims_dfs_generator';
import randomized_dfs_generator from './generators/randomized_dfs_generator';
import changeButtonStatus from './button_util';
import maze_solver from './solvers/maze_solver';
import Grid from './components/grid';
import Node from './components/node';


const mazeHandlers = (canvas) => {
  changeButtonStatus(true, true);

  const quickGenerators = [primsDfsGenerator, randomized_dfs_generator];
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  let grid;
  let root;

  const generateMaze = (solve_algo, gen_algo, generator, rootCoords = [0, 0]) => {
    grid = new Grid([50, 50]);
    root = new Node(rootCoords, null);
    ctx.clearRect(0, 0, width, height);

    changeButtonStatus(true);

    generator(grid, root, ctx, solve_algo, gen_algo);
  }

  const descriptions = {
    'prims': "<p class='algo-title'>Prim's Algorithm</p><p/>1. Choose a node as the root, and store it in a set.<br/>2. Select the node in the set that would result in the least cost* to travel to.<br/>3. Add the node to the maze unless it will cause a loop.<br/>4. Add the node's neighbors to the set.<br/>4. Remove the node from the set.<br/>5. Repeat steps 2-4 until the set is empty.<br/><br/>* Since nodes are evenly spaced, the cost of travelling to a neighboring node is always the same. Consequetly, we simply choose a random node from the set.",
    'strict_dfs': "<p class='algo-title'>Strict DFS<p> 1. Initialize a stack with a single node.<br/>2. Pop a node from the stack. <br/>3. Push each of the node's unvisited neighbors onto the stack.<br/>4. Repeat step two onward until the stack is empty. <br/></p>",
    'randomized_dfs': "<p class='algo-title'>Depth First Traversal</p><p> 1. Initialize a stack with a single node.<br/>2. Look at the next node on the stack.<br/>3. If the node has unvisited neighbors, push a random one onto the stack. Else, pop the node from the stack.<br/>4. Repeat step two onward until the stack is empty. <br/></p>",
    'dfs_solver': "<p class='algo-title'>Depth First Search</p><p> 1. Initialize a stack with a single node.<br/>2. Pop a node from the stack. <br/>3. Push each of the node's unvisited neighbors onto the stack.<br/><br/>4. Repeat step two onward until the target is found. <br/><br/></p>",
    'bfs_solver': "<p class='algo-title'>Breadth First Search</p><p>BFS works similarly to DFS but it distinguishes itself by visiting a root's neighbors first, rather than it's descendants. We accomplish this by replacing our stack from DFS with a queue.</p>",
    'a*_solver': "<p class='algo-title'>A*</p>1. Initialize a set with a single node.<br/>2. Remove the node with the least f value* from the set.<br/>3. For each of the node's nieghbors:<br/>  3a. Calculate f value.<br/> 3b. If there is a visited node with the same coordinates and a lower f-value, discard the neighbor. Else, add it to the set.<br/>Repeat steps 2-3 until the target is reached.<br/><br/>* F-value = number of steps from the root + euclidean distance from the target.</p>",
    'quick_maze': "<p class='algo-title'>Quick Maze</p><br/><p>To generate a quick maze, the machine randomly selects either Prim's algorithm or Randomized DFS.</p>"
  }


  document.getElementById('prims_generator').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['prims'];
    generateMaze(null, 'prims', primsDfsGenerator);
  })

  document.getElementById('randomized_dfs_generator').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['randomized_dfs'];
    generateMaze(null, null, randomized_dfs_generator);
  })

  document.getElementById('strict_dfs_generator').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['strict_dfs'];
    generateMaze(null, 'dfs', primsDfsGenerator, [0, 0]);
  })

  document.getElementById('quick_maze').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['quick_maze'];
    const generator = quickGenerators[Math.floor(Math.random() * quickGenerators.length)];
    generateMaze('quick', 'prims', generator, [0, 0]);
  })

  document.getElementById('dfs_solver').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['dfs_solver'];
    maze_solver(ctx, root, grid.matrix[48][48], grid, 'dfs');
  })

  document.getElementById('bfs_solver').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['bfs_solver'];
    maze_solver(ctx, root, grid.matrix[48][48], grid, 'bfs');
  })

  document.getElementById('a*_solver').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['a*_solver'];
    maze_solver(ctx, root, grid.matrix[48][48], grid, 'a*');
  })
}

export default mazeHandlers;
