# MazeGenerator

This maze generator features five algorithms. It constructs random mazes using Depth First Search, Kruskal's Algorithm, and Prim's Algorithm. It solves mazes using Depth First Search, Breadth First Search, and A*. It's built with pure JavaScript.

Several of the algorithms shared considerable logic. In an effort to keep my code DRY, I used generalized functions to construct and solve mazes whenever possible. Heres the function that makes mazes with either DFS or Prim's, depending of it's parameters:

```javascript
import maze_solver from '../solvers/maze_solver';

const primsDfsGenerator = (grid, root, ctx, solve_algo, gen_algo) => {

  let options = [root];

  const generationStep = () => {
    if(options.length === 0) {
      window.clearInterval(timer);
      return;
    };

    let selected;
    if(gen_algo === 'prims') {
      let randomIndex = Math.floor(Math.random() * options.length);
      selected = options.splice(randomIndex, 1)[0];
    } else{
      selected = options.pop();
    }


    if(grid.openAt(selected.x, selected.y)) {
      grid.continuePath(selected, ctx);
      selected.generateChildren(grid);
      options = options.concat(selected.children);
    }
  }

  if(solve_algo){
    while(options.length > 0){
      generationStep();
    }
    debugger
    maze_solver(ctx, grid.matrix[0][0], grid.matrix[48][48], grid, solve_algo);
  } else{
    const timer = window.setInterval(generationStep, 0);
  }

}
export default primsDfsGenerator;
```
And heres the function that solves mazes:

``` javascript
import MinHeap from '../components/min_heap';

const maze_solver = (ctx, root, target, grid, algo) => {
  const euclideanDist = (current, target) => {
    return Math.sqrt(
      Math.pow((target.x - current.x), 2) +
      Math.pow((target.y - current.y), 2)
    )
  };
  const comparator = (node1, node2) => {
    return node1.fVal > node2.fVal;
  }
  root.gVal = 0;
  let options = algo === 'a*' ? new MinHeap(comparator, root) : [root];

  const solutionStep = () => {
    let selected = algo === 'dfs' ? options.pop() : options.shift();

    grid.drawPath(ctx, selected, '#fffbfb');

    if(selected.x === target.x && selected.y === target.y) {

      grid.drawSolution(root, target, ctx);
      clearInterval(timer);
    }

    selected.children.forEach(child => {
      if (child.onPath) {

        if (algo === 'a*') {
          child.gVal = child.parent.gVal + 1;
          child.hVal = euclideanDist(child, target);
          child.fVal = child.gVal + child.hVal;
        }

        options.push(child);
      };
    });
  }

  const timer = setInterval(solutionStep, 0);
}

export default maze_solver;

```
