import maze_solver from '../solvers/maze_solver';

const primsDfsGenerator = (grid, root, canvas, solve_algo, gen_algo) => {

  const ctx = canvas.getContext('2d');
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
debugger

    if(grid.openAt(selected.x, selected.y)) {
      grid.continuePath(selected, ctx);
      selected.generateChildren(grid);
debugger
      options = options.concat(selected.children);
    }
  }

  if(solve_algo){
    while(options.length > 0){
      generationStep();
    }
    maze_solver(ctx, root, grid.matrix[48][48], grid, solve_algo);
  } else{
    const timer = window.setInterval(generationStep, 0);
  }

}
export default primsDfsGenerator;
