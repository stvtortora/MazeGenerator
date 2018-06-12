// import maze_solver from '../solvers/maze_solver';
//
// const recursive_backtrack_generator = (grid, root, ctx, algo) => {
//   const shuffle = (array) => {
//     for(let i = 0; i < array.length; i++) {
//       let j = Math.floor(Math.random() * array.length);
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }
//
//   const generationStep = (node) => {
//
//     shuffle(node.adjacentCoords).forEach(coords => {
//       if(grid.inBounds(coords[0], coords[1]) && grid.openAt(coords[0], coords[1])){
//
//         node.generateChild(coords);
//         let child = node.children[node.children.length - 1];
//         grid.continuePath(child, ctx);
//         generationStep(child);
//       }
//     });
//   }
//
//   generationStep(root);
//   maze_solver(ctx, root, grid.matrix[48][48], grid, algo);
// }
//
//
// export default recursive_backtrack_generator;
