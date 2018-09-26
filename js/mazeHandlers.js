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

  const descriptions = {
    'prims': "<h3>Prim's Algorithm</h3><p>The next algorithm we'll check out is Prim's. Here's a high-level overview of how it works: <br/><br/>1. Choose a node as the root, and store it in a set.<br/>2. Select the node in the set that would result in the least cost* to travel to.<br/>3. Add the node to the maze unless it will cause a loop.<br/>4. Add the node's children to the set.<br/>4. Remove the node from the set.<br/>5. Repeat steps 2-4 until the set is empty.<br/><br/>Notice that step two requires we select the node that would result it the least cost to travel to. In our case, least cost translates to least distance.However, since each edge in our maze spans exactly the same distance, this step is irrelevant to us. We can modfiy Prim's algorithm slightly to account for this. Here's our new step 2: <br/><br/>2. Select a random node from the set. <br/>",
    'strict_dfs': "<h3>With a strict implementation of DFS, there is no randomness to building our maze and we are left with a predictable path. Here's how it works: <br/><br/>1. Initialize a stack with a single node.<br/>2. Pop a node from the stack. <br/>3. Push each of the node's unvisited children onto the stack.<br/>4. Repeat step two onward until the stack is empty. <br/><br/>This version of DFT uses pre-order traversal, meaning that a parent node is visited before any of its children. As we see when we click figure 1, pre-order traversal doesn't create much of a maze when implemented strictly.<br/><br/></p>",
    'randomized_dfs': "<h3>Depth First Traversal</h3><p>Here are the steps for randomized DFS: <br/><br/>1. Initialize a stack with a single node.<br/>2. Look at the next node on the stack.<br/>3. If the node has unvisited children, push a random one onto the stack. Else, pop the node from the stack.<br/>4. Repeat step two onward until the stack is empty. <br/><br/>This version of DFT uses pre-order traversal, meaning that a parent node is visited before any of its children. As we see when we click figure 1, pre-order traversal doesn't create much of a maze when implemented strictly.<br/><br/></p>",
    'dfs_solver': "<h3>Depth First Search</h3><p>We're going to use DFS to solve a maze this time. The algorithm works just like our DFS generator, except we change step four to repeat each step until our target is reached. By doing so, we avoid unecessary iterations!<br/>/><br/>1. Initialize a stack with a single node.<br/>2. Pop a node from the stack. <br/>3. Push each of the node's unvisited children onto the stack.<br/><br/>4. Repeat step two onward until the target is found. <br/><br/></p>",
    'bfs_solver': "<h3>Breadth First Search</h3><p>BFS works similarly to DFS. As the name implies, it distinguishes itself by visiting a root's sibilings first, rather than it's children. We accomplish this by substituting our stack from DFS with a queue.</p>",
    'a*_solver': "<h3>A*</h3><p>An extension of Dijkstra's algorithm, A* proceeds with the following steps:<br/><br/>1. Initialize a set with a single node.<br/>2. Choose the node from the set with the least f-value*, and remove it from the set.<br/>3. For each of the node's children:<br/>3a. Calculate the f value of each of the node's children.<br/>3b. If there is a visited node with the same coordinates and a lower f-value as this child, discard the child. Else, add it to the set.<br/>Repeat steps 2-3 until the target is reached.<br/><br/>* A node's f-value is calculated by adding it's g-value to it's h-value. A node's g-value is simply how many steps away it is from the root, and it's h-value is it's euclidean distance from the target.A* is a 'smart' algorithm, in that it uses the a node's f-value as a heuristic 'guess' how likely it is to be closest to the target. It selects the node with the least f in attempt to reach the target faster.<br/></p>"
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
    document.getElementById('description').innerHTML = descriptions['prims'];
    generateMaze('quick', 'prims', primsDfsGenerator, [0, 0]);
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
