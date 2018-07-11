# Maze Generator

http://steventortora.com/MazeGenerator/

This maze generator features five algorithms. It constructs random mazes using Depth First Search, Kruskal's Algorithm, and Prim's Algorithm. It solves mazes using Depth First Search, Breadth First Search, and A*. It's built with pure JavaScript.

Several of the algorithms shared considerable logic. In an effort to keep my code DRY, I used generalized functions to construct and solve mazes whenever possible. Heres the master maze generator:

```javascript
import Grid from '../components/grid';
import Node from '../components/node';

const maze = (maze_generator, canvasId, rootCoords, gridDimensions, solve_algo, gen_algo) => {
  const canvas = document.getElementById(canvasId);

  canvas.addEventListener("click", ()=> {
    const grid = new Grid(gridDimensions);
    const root = new Node(rootCoords, null);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    maze_generator(grid, root, ctx, solve_algo, gen_algo);
  });
}


export default maze;
```
