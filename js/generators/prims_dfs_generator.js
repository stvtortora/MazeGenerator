import maze_solver from '../solvers/maze_solver';
import changeButtonStatus from '../button_util';

const primsDfsGenerator = (grid, root, ctx, solve_algo, gen_algo) => {

  let options = [root];

  const generationStep = () => {
    if(options.length === 0) {
      window.clearInterval(timer);
      changeButtonStatus(false);
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

  let timer;
  if(solve_algo){
    while(options.length > 0){
      generationStep();
      changeButtonStatus(false);
    }
    // maze_solver(ctx, grid.matrix[0][0], grid.matrix[48][48], grid, solve_algo);
  } else {
      timer = setInterval(generationStep, 0);
  }

}
export default primsDfsGenerator;
