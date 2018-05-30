import maze_solver from '../solvers/maze_solver';

const primsDfsGenerator = (grid, root, ctx, solve_algo, gen_algo) => {

  let options = [root];

  const generationStep = () => {
    if(options.length === 0) {
      window.clearInterval(timer);
      // maze_solver(ctx, root, grid.matrix[48][48], grid, algo);
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
      // selected.generateChildren(grid);
      selected.children = selected.adjacentCoords.map(coords => {
        if(grid.inBounds(coords[0], coords[1]) && grid.openAt(coords[0], coords[1])){
          const child = grid.matrix[coords[0]][coords[1]];
          child.parent = selected;
          child.parent_connector = grid.matrix[(child.x + selected.x) / 2][(child.y + selected.y) / 2];
          return child;
        }
      }).filter(child => {
        return child;
      });

      options = options.concat(selected.children);
    }
  }

  if(solve_algo){
    while(options.length > 0){
      generationStep();
    }
    debugger
    maze_solver(ctx, root, grid.matrix[48][48], grid, solve_algo);
  } else{
    const timer = window.setInterval(generationStep, 0);
  }

}
export default primsDfsGenerator;
