import generate_maze from './generators/master_generator';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('maze');
  canvas.addEventListener("click", () => {
    generate_maze(canvas, [0, 0], [100, 100]);
  });
});
