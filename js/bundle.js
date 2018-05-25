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


  intersectsPath(node) {
    if(this.matrix[node.x][node.y].path) { return true };//if there is already a path node at this space
    node.neighborCoords.forEach(coords => {
      if(this.inBounds(coords[0], coords[1])){

        const neighbor = this.matrix[coords[0]][coords[1]];

        if(neighbor !== node.parent && neighbor.path) {
          return true;
        }
      }

    });
    return false;
  }

  continuePath(node) {
    this.matrix[node.x][node.y] = node;
  }

  inBounds(x, y){
    return (x >= 0 && x < this.xDim) && (y >= 0 && y < this.yDim)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Grid);


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
  constructor(rootCoords, path) {
    this.x = rootCoords[0];
    this.y = rootCoords[1];
    this.path = path;
    this.parent = null;
    this.parent_connector = null;
    this.neighborCoords = [
      [this.x + 2, this.y],
      [this.x - 2, this.y],
      [this.x, this.y + 2],
      [this.x, this.y - 2]
    ]
    this.children = null;
  }

  generateChildren(grid) {
    this.children = this.neighborCoords.map(coords => {
      const child = new Node(coords, true);
      child.parent = this;
      const parent_connector = new Node ([(child.x + child.parent.x) / 2, (child.y + child.parent.y) / 2], true);
      child.parent_connector = parent_connector;

      return child;
    }).filter(child => {
      return grid.inBounds(child.x, child.y);
    });
  }

  removeChild(reject) {
    const newChildren = this.children.filter(child => {
      return child.x !== reject.x && child.y !== reject.y;
    });

    this.children = newChildren;
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



const generate_maze = (canvas, rootCoords, gridDimensions) => {
  //
  const grid = new _components_grid__WEBPACK_IMPORTED_MODULE_0__["default"](gridDimensions);
  const root = new _components_node__WEBPACK_IMPORTED_MODULE_1__["default"](rootCoords, true);
  const ctx = canvas.getContext('2d');
  let options = [root];

  const step = () => {
    if(options.length === 0) {
      window.clearInterval(timer);
      return;
    };

    let randomIndex = Math.floor(Math.random() * options.length);
    let selected = options.splice(randomIndex, 1)[0];

    if(!grid.intersectsPath(selected)) {
      grid.continuePath(selected);
      drawPath(ctx, selected);
      let children = selected.generateChildren(grid)
      options = options.concat(selected.children);

    } else {
      selected.parent.removeChild(selected);
    }
  }

  const timer = window.setInterval(step, 0);

  const drawPath = (ctx, node) => {
    ctx.fillStyle = "#2ae950";

    if(node.parent_connector){
      debugger
      ctx.fillRect(node.parent_connector.x * 5, node.parent_connector.y * 5, 5, 5);
    }
    ctx.fillRect(node.x * 5, node.y * 5, 5, 5);
  }

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
    Object(_generators_master_generator__WEBPACK_IMPORTED_MODULE_0__["default"])(canvas, [0, 0], [100, 100]);
  });
});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map