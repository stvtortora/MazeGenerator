import maze_solver from '../solvers/maze_solver';

const randomized_dfs_generator = (grid, root, ctx, algo) => {
  const shuffle = (array) => {
    for(let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * array.length);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  grid.continuePath(root, ctx);
  let options = [root];

  const generationStep = () => {
    if(options.length === 0) {
      window.clearInterval(timer);
      return;
    };

    const parent = options[options.length - 1];
    const childCoords = shuffle(parent.adjacentCoords);
    let checked = 0
    let selected = null;

    while(checked < childCoords.length && !selected){
      let coords = childCoords[checked];

      if(grid.inBounds(coords[0], coords[1]) && grid.openAt(coords[0], coords[1])){

        parent.generateChild(coords);
        let child = parent.children[parent.children.length - 1];
        grid.continuePath(child, ctx);
        selected = child;

      }

      checked++;
    }

    selected ? options.push(selected) : options.pop();
  }

  const timer = setInterval(generationStep, 0);
}


export default randomized_dfs_generator;
