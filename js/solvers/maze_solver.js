import MinHeap from '../components/min_heap';

const maze_solver = (ctx, root, target, grid, algo) => {
  debugger
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
debugger
    grid.drawPath(ctx, selected, '#fffbfb');

    if(selected.x === target.x && selected.y === target.y) {

      grid.drawSolution(root, target, ctx);
      clearInterval(timer);
    }
debugger
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
    debugger

  }

  const timer = setInterval(solutionStep, 0);
}

export default maze_solver;
