import Heap from '../components/heap';

const a_star_solver = (ctx, root, target, algo, grid) => {
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
  let options = new Heap(comparator, root);

  const solutionStep = () => {
    let selected = options.shift();

    grid.drawPath(ctx, selected, "#000000");
    if(selected.x === target.x && selected.y === target.y) {

      grid.drawSolution(root, target, ctx);
      clearInterval(timer);
    }

    selected.children.forEach(child => {
      if (child.onPath) {
        child.gVal = child.parent.gVal + 1;
        child.hVal = euclideanDist(child, target);
        child.fVal = child.gVal + child.hVal;
        options.push(child);
      };
    });
  }

  const timer = setInterval(solutionStep, 0);
}

export default a_star_solver;
