

const dfs_bfs_solver = (ctx, root, target, algo, grid) => {
  let options = [root];

  const solutionStep = () => {
    let selected = algo === 'dfs' ? options.pop() : options.shift();
    debugger
    grid.drawPath(ctx, selected, "#000000");
    if(selected.x === target.x && selected.y === target.y) {
      debugger
      grid.drawSolution(root, target, ctx);
      clearInterval(timer);
    }

    selected.children.forEach(child => {
      if (child.onPath) {
        options.push(child);
      };
    });
  }

  const timer = setInterval(solutionStep, 0);
}

export default dfs_bfs_solver;
