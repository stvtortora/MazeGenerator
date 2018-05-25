export const drawSolution = (root, target, ctx) => {
  const path = [target];

  while(path[0].x !== root.x || path[0].y !== root.y) {
    let node = path[0].parent;
    path.unshift(node);
  }

  const drawStep = () => {
    path.forEach(node => {
      drawPath(ctx, node, '#ff2103')
    });
  }

  const timer = setInterval(drawStep, 0);
}

export const drawPath = (ctx, node, color) => {
  ctx.fillStyle = color;

  if(node.parent_connector){
    ctx.fillRect(node.parent_connector.x * 5, node.parent_connector.y * 5, 5, 5);
  }
  ctx.fillRect(node.x * 5, node.y * 5, 5, 5);
}
