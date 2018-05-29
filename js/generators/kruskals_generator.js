import maze_solver from '../solvers/maze_solver';
import DisjointSet from '../components/disjoint_set';

const kruskals_generator = (grid, root, canvas, algo) => {
  const disjointSet = new DisjointSet;
  const flatten = (array) => {
    let flattened = [];

    for (let i = 0; i < array.length; i++) {
      const el = array[i];
      if (Array.isArray(el)){
        flattened = flattened.concat(flatten(el));
      } else{
        flattened.push(el);
      }
    }

    return flattened;
  }

  const rejectWalls = (nodes) => {
    return nodes.filter(node => {
      return node.x % 2 === 0 && node.y % 2 === 0;
    });
  }

  const shuffle = (array) => {
    for(let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * array.length);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const ctx = canvas.getContext('2d');
  let options = rejectWalls(flatten(grid.matrix));
debugger

  const generationStep = () => {
    if(options.length === 0) {

      // checkSets();
      window.clearInterval(timer);
      // maze_solver(ctx, root, grid.matrix[48][48], grid, algo);
      return;
    };

    let randomIndex = Math.floor(Math.random() * options.length);
    const selected = options[randomIndex];

    if(selected.adjacentCoords.length > 0){
      let randomIndex = Math.floor(Math.random() * selected.adjacentCoords.length);
      const coords = selected.adjacentCoords.splice(randomIndex, 1)[0];

      if(grid.inBounds(coords[0], coords[1])){
        const neighbor = grid.matrix[coords[0]][coords[1]];

        if(!disjointSet.joined(selected, neighbor)){
          debugger
          disjointSet.merge(selected, neighbor);
          neighbor.parent = selected;

          neighbor.parent_connector = grid.matrix[(neighbor.x + selected.x) / 2][(neighbor.y + selected.y) / 2];
          grid.continuePath(selected, ctx);
          grid.continuePath(neighbor, ctx);
        }

      }

    } else{
      options.splice(randomIndex, 0);
    }

  }

  const timer = setInterval(generationStep, 0);
}



export default kruskals_generator;
