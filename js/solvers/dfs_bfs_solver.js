import { drawPath, drawSolution } from '../util/canvas_util';

const dfs_bfs_solver = (ctx, root, target, algo) => {
  let options = [root];

  const solutionStep = () => {
    let selected = algo === 'dfs' ? options.pop() : options.shift();
    debugger
    drawPath(ctx, selected, "#872bc4");
    if(selected.x === target.x && selected.y === target.y) {
      drawSolution(root, target, ctx);
      return;

    }
debugger
    if(selected.children) {
      options = options.concat(selected.children);
      debugger
    }
  }

  setInterval(solutionStep, 0);
}

export default dfs_bfs_solver;
