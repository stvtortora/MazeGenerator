import maze from './generators/master_generator';
import primsDfsGenerator from './generators/prims_dfs_generator';
import randomized_dfs_generator from './generators/randomized_dfs_generator';
import kruskals_generator from './generators/kruskals_generator';



document.addEventListener("DOMContentLoaded", () => {
    maze(primsDfsGenerator, '1', [0, 0], [50, 50], null, 'dfs');
    maze(randomized_dfs_generator, '2', [24, 24], [50, 50], null);
    maze(primsDfsGenerator, '3', [24, 24], [50, 50], null, 'prims');
    maze(kruskals_generator, '4', [0, 0], [50, 50], 'dfs', 'dfs');
    maze(primsDfsGenerator, '5', [0, 0], [50, 50], 'dfs', 'prims');
    maze(primsDfsGenerator, '6', [0, 0], [50, 50], 'bfs', 'prims');
    maze(primsDfsGenerator, '7', [0, 0], [50, 50], 'a*', 'prims');

    const mazeIds = ['1', '2', '3', '4', '5', '6', '7'].forEach(id => {
      const canvas = document.getElementById(id);
      const ctx = canvas.getContext('2d');
      ctx.font = '30px sans-serif'
      ctx.fillStyle = 'white';
      ctx.fillText("Click to View Maze", 100, canvas.height/2);
    });
});
