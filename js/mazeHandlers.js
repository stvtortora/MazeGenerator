import maze from './generators/master_generator';
import primsDfsGenerator from './generators/prims_dfs_generator';

const mazeHandlers = (canvas) => {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  document.getElementById('1').addEventListener("click", () => {
    maze(primsDfsGenerator, ctx, width, height, [24, 24], [50, 50], null, 'prims');
  })
}

export default mazeHandlers;
