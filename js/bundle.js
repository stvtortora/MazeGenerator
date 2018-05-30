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
    this.children = this.adjacentCoords.map(coords => {
      const child = new Node(coords, null);
      child.parent = this;
      const parent_connector = new Node ([(child.x + child.parent.x) / 2, (child.y + child.parent.y) / 2], null);
      child.parent_connector = parent_connector;

      return child;
    }).filter(child => {
      return grid.inBounds(child.x, child.y);
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
/* harmony import */ var _solvers_maze_solver2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../solvers/maze_solver2 */ "./js/solvers/maze_solver2.js");
/* harmony import */ var _components_disjoint_set__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/disjoint_set */ "./js/components/disjoint_set.js");



const kruskals_generator = (grid, root, ctx, algo) => {
  const disjointSet = new _components_disjoint_set__WEBPACK_IMPORTED_MODULE_1__["default"];
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

      // checkSets();
      window.clearInterval(timer);
      // maze_solver(ctx, grid.matrix[0][0], grid.matrix[48][48], grid, algo);
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



const maze = (maze_generator, canvasId, rootCoords, gridDimensions, solve_algo, gen_algo) => {
  const canvas = document.getElementById(canvasId);

  canvas.addEventListener("click", ()=> {
    const grid = new _components_grid__WEBPACK_IMPORTED_MODULE_0__["default"](gridDimensions);
    const root = new _components_node__WEBPACK_IMPORTED_MODULE_1__["default"](rootCoords, null);
    // const root = grid.matrix[0][0];
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    maze_generator(grid, root, ctx, solve_algo, gen_algo);
  });
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


const primsDfsGenerator = (grid, root, ctx, solve_algo, gen_algo) => {

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


    if(grid.openAt(selected.x, selected.y)) {
      grid.continuePath(selected, ctx);
      selected.generateChildren(grid);
      options = options.concat(selected.children);
    }
  }

  if(solve_algo){
    while(options.length > 0){
      generationStep();
    }
    debugger
    Object(_solvers_maze_solver__WEBPACK_IMPORTED_MODULE_0__["default"])(ctx, grid.matrix[0][0], grid.matrix[48][48], grid, solve_algo);
  } else{
    const timer = window.setInterval(generationStep, 0);
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
      // maze_solver(ctx, root, grid.matrix[48][48], grid, algo);
      return;
    };

    const parent = options[options.length - 1];
    const childCoords = shuffle(parent.adjacentCoords);
    let checked = 0
    let selected = null;

    while(checked < childCoords.length && !selected){
      let coords = childCoords[checked];

      if(grid.inBounds(coords[0], coords[1]) && grid.openAt(coords[0], coords[1])){
        debugger
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







document.addEventListener("DOMContentLoaded", () => {
    Object(_generators_master_generator__WEBPACK_IMPORTED_MODULE_0__["default"])(_generators_prims_dfs_generator__WEBPACK_IMPORTED_MODULE_1__["default"], '1', [0, 0], [50, 50], null, 'dfs');
    Object(_generators_master_generator__WEBPACK_IMPORTED_MODULE_0__["default"])(_generators_randomized_dfs_generator__WEBPACK_IMPORTED_MODULE_2__["default"], '2', [24, 24], [50, 50], null);
    Object(_generators_master_generator__WEBPACK_IMPORTED_MODULE_0__["default"])(_generators_prims_dfs_generator__WEBPACK_IMPORTED_MODULE_1__["default"], '3', [24, 24], [50, 50], null, 'prims');
    Object(_generators_master_generator__WEBPACK_IMPORTED_MODULE_0__["default"])(_generators_kruskals_generator__WEBPACK_IMPORTED_MODULE_3__["default"], '4', [0, 0], [50, 50], 'dfs', 'dfs');
    Object(_generators_master_generator__WEBPACK_IMPORTED_MODULE_0__["default"])(_generators_prims_dfs_generator__WEBPACK_IMPORTED_MODULE_1__["default"], '5', [0, 0], [50, 50], 'dfs', 'prims');
    Object(_generators_master_generator__WEBPACK_IMPORTED_MODULE_0__["default"])(_generators_prims_dfs_generator__WEBPACK_IMPORTED_MODULE_1__["default"], '6', [0, 0], [50, 50], 'bfs', 'prims');
    Object(_generators_master_generator__WEBPACK_IMPORTED_MODULE_0__["default"])(_generators_prims_dfs_generator__WEBPACK_IMPORTED_MODULE_1__["default"], '7', [0, 0], [50, 50], 'a*', 'prims');

    const mazeIds = ['1', '2', '3', '4', '5', '6', '7'].forEach(id => {
      const canvas = document.getElementById(id);
      const ctx = canvas.getContext('2d');
      ctx.font = '30px sans-serif'
      ctx.fillStyle = 'white';
      ctx.fillText("Click to View Maze", 100, canvas.height/2);
    });
});


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


const maze_solver = (ctx, root, target, grid, algo) => {
  debugger
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

  const solutionStep = () => {
    let selected = algo === 'dfs' ? options.pop() : options.shift();
debugger
    grid.drawPath(ctx, selected, '#fffbfb');

    if(selected.x === target.x && selected.y === target.y) {

      grid.drawSolution(root, target, ctx);
      clearInterval(timer);
    }
debugger
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
    debugger

  }

  const timer = setInterval(solutionStep, 0);
}

/* harmony default export */ __webpack_exports__["default"] = (maze_solver);


/***/ }),

/***/ "./js/solvers/maze_solver2.js":
/*!************************************!*\
  !*** ./js/solvers/maze_solver2.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_min_heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/min_heap */ "./js/components/min_heap.js");


const maze_solver = (ctx, root, target, grid, algo) => {

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
  const visited = {};
  visited[root] = root;

  const solutionStep = () => {
    let selected = algo === 'dfs' ? options.pop() : options.shift();
debugger
    grid.drawPath(ctx, selected, '#fffbfb');

    if(selected.x === target.x && selected.y === target.y) {

      grid.drawSolution(root, target, ctx);
      clearInterval(timer);
    }

    if(selected.adjacentCoords.length === 0) {
      debugger
      const neighborCoords = [
        [selected.x - 2, selected.y],
        [selected.x + 2, selected.y],
        [selected.x, selected.y - 2],
        [selected.x, selected.y + 2]
      ];

      neighborCoords.forEach(coords => {
        debugger
        if(grid.inBounds(coords[0], coords[1])){
          let neighbor = grid.matrix[coords[0]][coords[1]];
          let connector = grid.matrix[(selected.x + neighbor.x) / 2][(selected.y + neighbor.y) / 2];
          debugger
          if(connector.onPath) {
            if (algo === 'a*') {
              const gVal = selected.gVal + 1;
              const hVal = euclideanDist(neighbor, target);
              const fVal = gVal + hVal;
              if(!visited[neighbor] || visited[neighbor].fVal > fVal) {
                neighbor.gVal = gVal;
                neighbor.fVal = fVal;
                visited[neighbor] = neighbor;
                options.push(neighbor);
              }
            } else {
              debugger
              const key = JSON.stringify(neighbor);
              if(!visited[key]) {
                debugger
                visited[key] = neighbor;
                debugger
                options.push(neighbor);
              }
            }
          }
        }
      });
    }else {

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

  }

  const timer = setInterval(solutionStep, 0);
}

/* harmony default export */ __webpack_exports__["default"] = (maze_solver);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map