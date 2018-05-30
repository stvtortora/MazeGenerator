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
  const visited = {};
  visited[root] = root;

  const solutionStep = () => {
    let selected = algo === 'dfs' ? options.pop() : options.shift();
debugger
    grid.drawPath(ctx, selected, '#fffbfb');

    if(selected.x === target.x && selected.y === target.y) {

      grid.drawSolution(root, target, ctx);
      clearInterval(timer);
    }

    if(selected.adjacentCoords.length === 0) {
      debugger
      const neighborCoords = [
        [selected.x - 2, selected.y],
        [selected.x + 2, selected.y],
        [selected.x, selected.y - 2],
        [selected.x, selected.y + 2]
      ];

      neighborCoords.forEach(coords => {
        debugger
        if(grid.inBounds(coords[0], coords[1])){
          let neighbor = grid.matrix[coords[0]][coords[1]];
          let connector = grid.matrix[(selected.x + neighbor.x) / 2][(selected.y + neighbor.y) / 2];
          debugger
          if(connector.onPath) {
            if (algo === 'a*') {
              const gVal = selected.gVal + 1;
              const hVal = euclideanDist(neighbor, target);
              const fVal = gVal + hVal;
              if(!visited[neighbor] || visited[neighbor].fVal > fVal) {
                neighbor.gVal = gVal;
                neighbor.fVal = fVal;
                visited[neighbor] = neighbor;
                options.push(neighbor);
              }
            } else {
              debugger
              const key = JSON.stringify(neighbor);
              if(!visited[key]) {
                debugger
                visited[key] = neighbor;
                debugger
                options.push(neighbor);
              }
            }
          }
        }
      });
    }else {

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

  }

  const timer = setInterval(solutionStep, 0);
}

export default maze_solver;
