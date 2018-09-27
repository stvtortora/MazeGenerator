/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/button_util.js":
/*!***************************!*\
  !*** ./js/button_util.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const changeButtonStatus = (status, onlySolvers = false) => {
  const buttons = document.getElementsByTagName('button');

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    
    if (!onlySolvers || button.getAttribute('class') === 'solver') {
      button.disabled = status;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (changeButtonStatus);


/***/ }),

/***/ "./js/components/disjoint_set.js":
/*!***************************************!*\
  !*** ./js/components/disjoint_set.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class DisjointSet {

  joined(node1, node2) {
    return node1.setRoot() === node2.setRoot();
  }

  merge(set1, set2) {
    set2.setRoot().setParent = set1.setRoot();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (DisjointSet);


/***/ }),

/***/ "./js/components/grid.js":
/*!*******************************!*\
  !*** ./js/components/grid.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./js/components/node.js");


class Grid {
  constructor(gridDimensions){
    this.xDim = gridDimensions[0];
    this.yDim = gridDimensions[1];
    this.matrix = this.constructMatrix();
  }

  constructMatrix() {
    let matrix = [];

    for(let i = 0; i < this.yDim; i++) {
      let row = [];
      for(let j = 0; j < this.xDim; j++) {
        const node = new _node__WEBPACK_IMPORTED_MODULE_0__["default"]([i, j], null);
        row.push(node);
      }
      matrix.push(row);
    }

    return matrix;
  }

  inBounds(x, y){
    return (x >= 0 && x < this.xDim) && (y >= 0 && y < this.yDim)
  }

  openAt(x, y) {
    return !this.matrix[x][y].onPath;
  }

  continuePath(node, ctx) {
    this.matrix[node.x][node.y] = node;
    node.onPath = true;
    if(node.parent_connector) {
      node.parent_connector.onPath = true;
    }
    this.drawPath(ctx, node, "#2ae950");
  }

  clearSolution (ctx, node) {
    for (let i = 0; i < this.yDim; i++) {
      for (let j = 0; j < this.xDim; j++) {
        const node = this.matrix[i][j];
        if (node.onPath) {
          this.drawPath(ctx, node, "#2ae950");
        }
      }
    }
  }

  drawSolution (root, target, ctx) {
    const path = [target];
    while(path[0].x !== root.x || path[0].y !== root.y) {
      let node = path[0].parent;
      path.unshift(node);
    }

    const drawStep = () => {
      path.forEach(node => {
        this.drawPath(ctx, node, '#ff2103');
      });
    }

    drawStep();
  }

  drawPath(ctx, node, color) {
    const multiplier = 10;
    ctx.fillStyle = color;
    if(node.parent_connector){
      ctx.fillRect(node.parent_connector.x * multiplier, node.parent_connector.y * multiplier, multiplier, multiplier);
    }
    ctx.fillRect(node.x * multiplier, node.y * multiplier, multiplier, multiplier);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Grid);


/***/ }),

/***/ "./js/components/min_heap.js":
/*!***********************************!*\
  !*** ./js/components/min_heap.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class MinHeap {
  constructor(comparator, root) {
    this.comparator = comparator;
    this.array = [root];
    this.length = 1;
    this.removed = null;
  }

  shift() {
    this.swap(0, this.length - 1);
    this.removed = this.array.pop();
    this.length--;
    this.heapifyDown();
    return this.removed;
  }

  push(node) {
    this.array.push(node);
    this.length++;
    this.heapifyUp();
  }

  swap(x, y) {
    let temp = this.array[x];
    this.array[x] = this.array[y];
    this.array[y] = temp;
  }

  heapifyUp() {
    let index = this.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    while(parentIndex > -1 && this.comparator(this.array[parentIndex], this.array[index])) {
      this.swap(parentIndex, index);
      index = parentIndex;
      parentIndex =  Math.floor((index - 1) / 2);
    }
  }

  heapifyDown() {
    let index = 0;
    let child1Index = 1;
    let child2Index = 2;
    let priorityChildIndex = this.priorityChildIndex(child1Index, child2Index);

    while(priorityChildIndex && this.comparator(this.array[index], this.array[priorityChildIndex])) {
      this.swap(index, priorityChildIndex);

      index = priorityChildIndex;
      child1Index = (priorityChildIndex * 2) + 1;
      child2Index = (priorityChildIndex * 2) + 2;
      priorityChildIndex = this.priorityChildIndex(child1Index, child2Index);
    }
  }

  priorityChildIndex(index1, index2) {
    if(index1 < this.length) {

      if(index2 >= this.length) {
        return index1;
      }

      return this.array[index1].fVal < this.array[index2].fVal ? index1 : index2;
    }
    return null;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (MinHeap);


/***/ }),

/***/ "./js/components/node.js":
/*!*******************************!*\
  !*** ./js/components/node.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Node {
  constructor(rootCoords, onPath) {
    this.x = rootCoords[0];
    this.y = rootCoords[1];
    this.onPath = onPath;
    this.parent = null;
    this.parent_connector = null;
    this.children = [];
    this.adjacentCoords = [
      [this.x + 2, this.y],
      [this.x - 2, this.y],
      [this.x, this.y + 2],
      [this.x, this.y - 2]
    ]
    this.gVal = null;
    this.hVal = null;
    this.fVal = null;
    this.setParent = null;
  }

  generateChild(coords) {
    const child = new Node(coords, null);
    child.parent = this;
    const parent_connector = new Node ([(child.x + child.parent.x) / 2, (child.y + child.parent.y) / 2], null);
    child.parent_connector = parent_connector;

    this.children.push(child);
  }

  generateChildren(grid) {
    this.adjacentCoords.forEach(coords => {
      if(grid.inBounds(coords[0], coords[1])){
        this.generateChild(coords);
      }
    });
  }

  setRoot() {
    return this.setParent ? this.setParent.setRoot() : this;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Node);


/***/ }),

/***/ "./js/generators/kruskals_generator.js":
/*!*********************************************!*\
  !*** ./js/generators/kruskals_generator.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_disjoint_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/disjoint_set */ "./js/components/disjoint_set.js");


const kruskals_generator = (grid, root, ctx, algo) => {
  const disjointSet = new _components_disjoint_set__WEBPACK_IMPORTED_MODULE_0__["default"];
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

  let options = rejectWalls(flatten(grid.matrix));

  const generationStep = () => {
    if(options.length === 0) {
      window.clearInterval(timer);
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

          disjointSet.merge(selected, neighbor);
          neighbor.parent = selected;
          // selected.children.push(neighbor);

          neighbor.parent_connector = grid.matrix[(neighbor.x + selected.x) / 2][(neighbor.y + selected.y) / 2];
          grid.continuePath(selected, ctx);
          grid.continuePath(neighbor, ctx);
        }

      }

    } else{
      options.splice(randomIndex, 1);
    }

  }

  const timer = setInterval(generationStep, 0);
}



/* harmony default export */ __webpack_exports__["default"] = (kruskals_generator);


/***/ }),

/***/ "./js/generators/master_generator.js":
/*!*******************************************!*\
  !*** ./js/generators/master_generator.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/grid */ "./js/components/grid.js");
/* harmony import */ var _components_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/node */ "./js/components/node.js");



//second argument was canvasId, now its the context
const maze = (maze_generator, ctx, width, height, rootCoords, gridDimensions, solve_algo, gen_algo) => {
  // const canvas = document.getElementById(canvasId);

  // canvas.addEventListener("click", ()=> {
    const grid = new _components_grid__WEBPACK_IMPORTED_MODULE_0__["default"](gridDimensions);
    const root = new _components_node__WEBPACK_IMPORTED_MODULE_1__["default"](rootCoords, null);
    // const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    maze_generator(grid, root, ctx, solve_algo, gen_algo);
  // });
}


/* harmony default export */ __webpack_exports__["default"] = (maze);


/***/ }),

/***/ "./js/generators/prims_dfs_generator.js":
/*!**********************************************!*\
  !*** ./js/generators/prims_dfs_generator.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _solvers_maze_solver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../solvers/maze_solver */ "./js/solvers/maze_solver.js");
/* harmony import */ var _button_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../button_util */ "./js/button_util.js");



const primsDfsGenerator = (grid, root, ctx, solve_algo, gen_algo) => {

  let options = [root];

  const generationStep = () => {
    if(options.length === 0) {
      Object(_button_util__WEBPACK_IMPORTED_MODULE_1__["default"])(false);
      window.clearInterval(timer);
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
      Object(_button_util__WEBPACK_IMPORTED_MODULE_1__["default"])(false);
    }
    // maze_solver(ctx, grid.matrix[0][0], grid.matrix[48][48], grid, solve_algo);
  } else {
      timer = setInterval(generationStep, 0);
  }

}
/* harmony default export */ __webpack_exports__["default"] = (primsDfsGenerator);


/***/ }),

/***/ "./js/generators/randomized_dfs_generator.js":
/*!***************************************************!*\
  !*** ./js/generators/randomized_dfs_generator.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _solvers_maze_solver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../solvers/maze_solver */ "./js/solvers/maze_solver.js");
/* harmony import */ var _button_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../button_util */ "./js/button_util.js");



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
      Object(_button_util__WEBPACK_IMPORTED_MODULE_1__["default"])(false);
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

  let timer;
  if (algo) {
    while(options.length > 0){
      generationStep();
      Object(_button_util__WEBPACK_IMPORTED_MODULE_1__["default"])(false);
    }
  } else {
    timer = setInterval(generationStep, 0);
  }
}


/* harmony default export */ __webpack_exports__["default"] = (randomized_dfs_generator);


/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generators_master_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generators/master_generator */ "./js/generators/master_generator.js");
/* harmony import */ var _generators_prims_dfs_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generators/prims_dfs_generator */ "./js/generators/prims_dfs_generator.js");
/* harmony import */ var _generators_randomized_dfs_generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generators/randomized_dfs_generator */ "./js/generators/randomized_dfs_generator.js");
/* harmony import */ var _generators_kruskals_generator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./generators/kruskals_generator */ "./js/generators/kruskals_generator.js");
/* harmony import */ var _mazeHandlers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mazeHandlers */ "./js/mazeHandlers.js");








document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('1');

    Object(_mazeHandlers__WEBPACK_IMPORTED_MODULE_4__["default"])(canvas);
});



// maze(primsDfsGenerator, '1', [0, 0], [50, 50], null, 'dfs');
// maze(randomized_dfs_generator, '2', [24, 24], [50, 50], null);
// maze(primsDfsGenerator, '3', [24, 24], [50, 50], null, 'prims');
// maze(kruskals_generator, '4', [0, 0], [50, 50], 'dfs', 'dfs');
// maze(primsDfsGenerator, '5', [0, 0], [50, 50], 'dfs', 'prims');
// maze(primsDfsGenerator, '6', [0, 0], [50, 50], 'bfs', 'prims');
// maze(primsDfsGenerator, '7', [0, 0], [50, 50], 'a*', 'prims');

// const mazeIds = ['1', '2', '3', '4', '5', '6', '7'].forEach(id => {
//   const canvas = document.getElementById(id);
//   const ctx = canvas.getContext('2d');
//   ctx.font = '30px sans-serif'
//   ctx.fillStyle = 'white';
//   ctx.fillText("Click to View Maze", 100, canvas.height/2);
// });


/***/ }),

/***/ "./js/mazeHandlers.js":
/*!****************************!*\
  !*** ./js/mazeHandlers.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generators_master_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generators/master_generator */ "./js/generators/master_generator.js");
/* harmony import */ var _generators_prims_dfs_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generators/prims_dfs_generator */ "./js/generators/prims_dfs_generator.js");
/* harmony import */ var _generators_randomized_dfs_generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generators/randomized_dfs_generator */ "./js/generators/randomized_dfs_generator.js");
/* harmony import */ var _button_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./button_util */ "./js/button_util.js");
/* harmony import */ var _solvers_maze_solver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./solvers/maze_solver */ "./js/solvers/maze_solver.js");
/* harmony import */ var _components_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/grid */ "./js/components/grid.js");
/* harmony import */ var _components_node__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/node */ "./js/components/node.js");









const mazeHandlers = (canvas) => {
  Object(_button_util__WEBPACK_IMPORTED_MODULE_3__["default"])(true, true);

  const quickGenerators = [_generators_prims_dfs_generator__WEBPACK_IMPORTED_MODULE_1__["default"], _generators_randomized_dfs_generator__WEBPACK_IMPORTED_MODULE_2__["default"]];
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  let grid;
  let root;

  const generateMaze = (solve_algo, gen_algo, generator, rootCoords = [0, 0]) => {
    grid = new _components_grid__WEBPACK_IMPORTED_MODULE_5__["default"]([50, 50]);
    root = new _components_node__WEBPACK_IMPORTED_MODULE_6__["default"](rootCoords, null);
    ctx.clearRect(0, 0, width, height);

    Object(_button_util__WEBPACK_IMPORTED_MODULE_3__["default"])(true);

    generator(grid, root, ctx, solve_algo, gen_algo);
  }

  const descriptions = {
    'prims': "<p class='algo-title'>Prim's Algorithm</p><p/>1. Choose a node as the root, and store it in a set.<br/>2. Select the node in the set that would result in the least cost* to travel to.<br/>3. Add the node to the maze unless it will cause a loop.<br/>4. Add the node's neighbors to the set.<br/>4. Remove the node from the set.<br/>5. Repeat steps 2-4 until the set is empty.<br/><br/>* Since nodes are evenly spaced, the cost of travelling to a neighboring node is always the same. Consequetly, we simply choose a random node from the set.",
    'strict_dfs': "<p class='algo-title'>Strict DFS<p> 1. Initialize a stack with a single node.<br/>2. Pop a node from the stack. <br/>3. Push each of the node's unvisited neighbors onto the stack.<br/>4. Repeat step two onward until the stack is empty. <br/></p>",
    'randomized_dfs': "<p class='algo-title'>Depth First Traversal</p><p> 1. Initialize a stack with a single node.<br/>2. Look at the next node on the stack.<br/>3. If the node has unvisited neighbors, push a random one onto the stack. Else, pop the node from the stack.<br/>4. Repeat step two onward until the stack is empty. <br/></p>",
    'dfs_solver': "<p class='algo-title'>Depth First Search</p><p> 1. Initialize a stack with a single node.<br/>2. Pop a node from the stack. <br/>3. Push each of the node's unvisited neighbors onto the stack.<br/><br/>4. Repeat step two onward until the target is found. <br/><br/></p>",
    'bfs_solver': "<p class='algo-title'>Breadth First Search</p><p>BFS works similarly to DFS but it distinguishes itself by visiting a root's neighbors first, rather than it's descendants. We accomplish this by replacing our stack from DFS with a queue.</p>",
    'a*_solver': "<p class='algo-title'>A*</p>1. Initialize a set with a single node.<br/>2. Remove the node with the least f value* from the set.<br/>3. For each of the node's nieghbors:<br/>  3a. Calculate f value.<br/> 3b. If there is a visited node with the same coordinates and a lower f-value, discard the neighbor. Else, add it to the set.<br/>Repeat steps 2-3 until the target is reached.<br/><br/>* F-value = number of steps from the root + euclidean distance from the target.</p>",
    'quick_maze': "<p class='algo-title'>Quick Maze</p><br/><p>To generate a quick maze, the machine randomly selects either Prim's algorithm or Randomized DFS.</p>"
  }


  document.getElementById('prims_generator').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['prims'];
    generateMaze(null, 'prims', _generators_prims_dfs_generator__WEBPACK_IMPORTED_MODULE_1__["default"]);
  })

  document.getElementById('randomized_dfs_generator').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['randomized_dfs'];
    generateMaze(null, null, _generators_randomized_dfs_generator__WEBPACK_IMPORTED_MODULE_2__["default"]);
  })

  document.getElementById('strict_dfs_generator').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['strict_dfs'];
    generateMaze(null, 'dfs', _generators_prims_dfs_generator__WEBPACK_IMPORTED_MODULE_1__["default"], [0, 0]);
  })

  document.getElementById('quick_maze').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['quick_maze'];
    const generator = quickGenerators[Math.floor(Math.random() * quickGenerators.length)];
    generateMaze('quick', 'prims', generator, [0, 0]);
  })

  document.getElementById('dfs_solver').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['dfs_solver'];
    Object(_solvers_maze_solver__WEBPACK_IMPORTED_MODULE_4__["default"])(ctx, root, grid.matrix[48][48], grid, 'dfs');
  })

  document.getElementById('bfs_solver').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['bfs_solver'];
    Object(_solvers_maze_solver__WEBPACK_IMPORTED_MODULE_4__["default"])(ctx, root, grid.matrix[48][48], grid, 'bfs');
  })

  document.getElementById('a*_solver').addEventListener("click", () => {
    document.getElementById('description').innerHTML = descriptions['a*_solver'];
    Object(_solvers_maze_solver__WEBPACK_IMPORTED_MODULE_4__["default"])(ctx, root, grid.matrix[48][48], grid, 'a*');
  })
}

/* harmony default export */ __webpack_exports__["default"] = (mazeHandlers);


/***/ }),

/***/ "./js/solvers/maze_solver.js":
/*!***********************************!*\
  !*** ./js/solvers/maze_solver.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_min_heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/min_heap */ "./js/components/min_heap.js");
/* harmony import */ var _button_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../button_util */ "./js/button_util.js");



const maze_solver = (ctx, root, target, grid, algo) => {
  Object(_button_util__WEBPACK_IMPORTED_MODULE_1__["default"])(true);
  grid.clearSolution(ctx);

  const euclideanDist = (current, target) => {
    return Math.sqrt(
      Math.pow((target.x - current.x), 2) +
      Math.pow((target.y - current.y), 2)
    )
  };
  const comparator = (node1, node2) => {
    return node1.fVal > node2.fVal;
  }
  root.gVal = 0;
  let options = algo === 'a*' ? new _components_min_heap__WEBPACK_IMPORTED_MODULE_0__["default"](comparator, root) : [root];
  debugger
  const solutionStep = () => {
    let selected = algo === 'dfs' ? options.pop() : options.shift();
    debugger
    grid.drawPath(ctx, selected, '#fffbfb');

    if(selected.x === target.x && selected.y === target.y) {

      grid.drawSolution(root, target, ctx);
      clearInterval(timer);
      Object(_button_util__WEBPACK_IMPORTED_MODULE_1__["default"])(false);
    }

    selected.children.forEach(child => {
      if (child.onPath) {

        if (algo === 'a*') {
          child.gVal = child.parent.gVal + 1;
          child.hVal = euclideanDist(child, target);
          child.fVal = child.gVal + child.hVal;
        }

        options.push(child);
      };
    });
  }

  const timer = setInterval(solutionStep, 0);
}

/* harmony default export */ __webpack_exports__["default"] = (maze_solver);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map