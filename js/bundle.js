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
        const node = new _node__WEBPACK_IMPORTED_MODULE_0__["default"]([j, i], null);
        row.push(node);
      }
      matrix.push(row);
    }

    return matrix;
  }

  inBounds(x, y){
    return (x >= 0 && x < this.xDim) && (y >= 0 && y < this.yDim)
  }

  canPlace(node) {
    return !this.matrix[node.x][node.y].onPath;
  }

  continuePath(node, ctx) {
    node.onPath = true;
    this.matrix[node.x][node.y] = node;
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
        debugger
        this.drawPath(ctx, node, '#ff2103')
      });
    }

    const timer = setInterval(drawStep, 0);
  }

  drawPath(ctx, node, color) {
    ctx.fillStyle = color;
    if(node.parent_connector){
      ctx.fillRect(node.parent_connector.x * 5, node.parent_connector.y * 5, 5, 5);
    }
    ctx.fillRect(node.x * 5, node.y * 5, 5, 5);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Grid);


/***/ }),

/***/ "./js/components/heap.js":
/*!*******************************!*\
  !*** ./js/components/heap.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Heap {
  constructor(comparator, root) {
    this.comparator = comparator;
    this.array = [root];
    this.length = 1;
  }

  shift() {
    this.length--;
    return this.array.shift();
  }

  push(node) {
    this.array.push(node);
    this.length++;
    this.heapify();
  }

  swap(x, y) {
    let temp = this.array[x];
    this.array[x] = this.array[y];
    this.array[y] = temp;
  }

  heapify() {
    let index = this.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
debugger
    while(parentIndex > -1 && this.comparator(this.array[parentIndex], this.array[index])) {
      debugger
      this.swap(parentIndex, index);
      index = parentIndex;
      parentIndex =  Math.floor((index - 1) / 2);
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Heap);


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
    this.children = null;
    this.adjacentCoords = [
      [this.x + 2, this.y],
      [this.x - 2, this.y],
      [this.x, this.y + 2],
      [this.x, this.y - 2]
    ]
    this.gVal = null;
    this.hVal = null;
    this.fVal = null;
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

}

/* harmony default export */ __webpack_exports__["default"] = (Node);


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
/* harmony import */ var _solvers_dfs_bfs_solver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../solvers/dfs_bfs_solver */ "./js/solvers/dfs_bfs_solver.js");
/* harmony import */ var _solvers_a_star_solver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../solvers/a_star_solver */ "./js/solvers/a_star_solver.js");





const generate_maze = (canvas, rootCoords, gridDimensions) => {
  //
  const grid = new _components_grid__WEBPACK_IMPORTED_MODULE_0__["default"](gridDimensions);
  const root = new _components_node__WEBPACK_IMPORTED_MODULE_1__["default"](rootCoords, null);
  const ctx = canvas.getContext('2d');
  let options = [root];

  const generationStep = () => {
    // if(options.length === 0) {
    //   window.clearInterval(timer);
    //   dfs_bfs_solver(ctx, root, grid.matrix[99][99], 'dfs');
    //   return;
    // };

    let randomIndex = Math.floor(Math.random() * options.length);
    let selected = options.splice(randomIndex, 1)[0];

    if(grid.canPlace(selected)) {
      grid.continuePath(selected, ctx);
      selected.generateChildren(grid);
      options = options.concat(selected.children);
    }
  }

  while(options.length > 0){
    generationStep();
  }
  debugger
  Object(_solvers_a_star_solver__WEBPACK_IMPORTED_MODULE_3__["default"])(ctx, root, grid.matrix[98][98], 'dfs', grid);

  // const timer = window.setInterval(generationStep, 0);
}

/* harmony default export */ __webpack_exports__["default"] = (generate_maze);


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


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('maze');
  canvas.addEventListener("click", () => {
    Object(_generators_master_generator__WEBPACK_IMPORTED_MODULE_0__["default"])(canvas, [50, 50], [100, 100]);
  });
});


/***/ }),

/***/ "./js/solvers/a_star_solver.js":
/*!*************************************!*\
  !*** ./js/solvers/a_star_solver.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/heap */ "./js/components/heap.js");


const a_star_solver = (ctx, root, target, algo, grid) => {
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
  let options = new _components_heap__WEBPACK_IMPORTED_MODULE_0__["default"](comparator, root);

  const solutionStep = () => {
    let selected = options.shift();

    grid.drawPath(ctx, selected, "#000000");
    if(selected.x === target.x && selected.y === target.y) {

      grid.drawSolution(root, target, ctx);
      clearInterval(timer);
    }

    selected.children.forEach(child => {
      if (child.onPath) {
        child.gVal = child.parent.gVal + 1;
        child.hVal = euclideanDist(child, target);
        child.fVal = child.gVal + child.hVal;
        options.push(child);
      };
    });
  }

  const timer = setInterval(solutionStep, 0);
}

/* harmony default export */ __webpack_exports__["default"] = (a_star_solver);


/***/ }),

/***/ "./js/solvers/dfs_bfs_solver.js":
/*!**************************************!*\
  !*** ./js/solvers/dfs_bfs_solver.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const dfs_bfs_solver = (ctx, root, target, algo, grid) => {
  let options = [root];

  const solutionStep = () => {
    let selected = algo === 'dfs' ? options.pop() : options.shift();
    debugger
    grid.drawPath(ctx, selected, "#000000");
    if(selected.x === target.x && selected.y === target.y) {
      debugger
      grid.drawSolution(root, target, ctx);
      clearInterval(timer);
    }

    selected.children.forEach(child => {
      if (child.onPath) {
        options.push(child);
      };
    });
  }

  const timer = setInterval(solutionStep, 0);
}

/* harmony default export */ __webpack_exports__["default"] = (dfs_bfs_solver);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map