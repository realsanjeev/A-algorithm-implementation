// MinHeap Implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(element) {
    this.heap.push(element);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.isEmpty()) return null;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  contains(element) {
    return this.heap.includes(element);
  }

  bubbleUp(index) {
    const element = this.heap[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      if (element.f >= parent.f) break;
      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.f < element.f) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild.f < element.f) ||
          (swap !== null && rightChild.f < leftChild.f)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }
}

// Global Variables
let cols = 25;
let rows = 25;
let grid = [];
let openSet;
let closedSet;
let start;
let end;
let w, h;
let path = [];
let isRunning = false;
let isFinished = false;
let noSolution = false;

// Setup Function
function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');

  w = width / cols;
  h = height / rows;

  resetGrid();

  // Event Listeners
  document.getElementById('start-btn').addEventListener('click', startAlgorithm);
  document.getElementById('reset-btn').addEventListener('click', resetPath);
  document.getElementById('clear-btn').addEventListener('click', resetGrid);
  document.getElementById('random-btn').addEventListener('click', randomizeWalls);
}

// Draw Function
function draw() {
  background(220); // Changed to light grey to see canvas boundaries

  if (isRunning && !isFinished) {
    if (!openSet.isEmpty()) {
      let current = openSet.pop();
      closedSet.push(current);

      if (current === end) {
        isFinished = true;
        isRunning = false;
        reconstructPath(current);
        document.getElementById('status-message').innerText = "Path Found!";
        console.log("DONE!");
      }

      let neighbors = current.neighbors;
      for (let neighbor of neighbors) {
        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          let tempG = current.g + heuristic(neighbor, current);
          let newPath = false;

          if (openSet.contains(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }

          if (newPath) {
            neighbor.h = heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
        }
      }
    } else {
      console.log('no solution');
      isFinished = true;
      isRunning = false;
      noSolution = true;
      document.getElementById('status-message').innerText = "No Solution Found.";
    }
  }

  // Draw Grid
  if (grid && grid.length > 0) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].show(color(255));
      }
    }
  }

  // Draw Closed Set
  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 100, 100)); // Light Red
  }

  // Draw Open Set
  for (let item of openSet.heap) {
    item.show(color(100, 255, 100)); // Light Green
  }

  // Draw Path
  if (!noSolution) {
    // If finished, draw the final path
    if (isFinished) {
      noFill();
      stroke(0, 0, 255);
      strokeWeight(w / 2);
      beginShape();
      for (let p of path) {
        vertex(p.i * w + w / 2, p.j * h + h / 2);
      }
      endShape();
    }
  }

  // Draw Start and End
  if (start) start.show(color(0, 255, 0)); // Green
  if (end) end.show(color(255, 0, 0)); // Red

  // Mouse Interaction
  if (mouseIsPressed && !isRunning && !isFinished) {
    handleMouseInput();
  }
}

function handleMouseInput() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if (grid[i] && grid[i][j]) {
      if (grid[i][j] !== start && grid[i][j] !== end) {
        grid[i][j].wall = true;
      }
    }
  }
}

function startAlgorithm() {
  if (isFinished) resetPath();
  isRunning = true;
  document.getElementById('status-message').innerText = "Searching...";
}

function resetPath() {
  isRunning = false;
  isFinished = false;
  noSolution = false;
  path = [];
  openSet = new MinHeap();
  closedSet = [];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].previous = undefined;
      grid[i][j].g = 0;
      grid[i][j].h = 0;
      grid[i][j].f = 0;
    }
  }

  openSet.push(start);
  document.getElementById('status-message').innerText = "Path reset. Press Start.";
}

function resetGrid() {
  isRunning = false;
  isFinished = false;
  noSolution = false;
  path = [];
  grid = new Array(cols);

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Node(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  openSet = new MinHeap();
  closedSet = [];
  openSet.push(start);

  document.getElementById('status-message').innerText = "Grid cleared. Draw walls and press Start.";
}

function randomizeWalls() {
  resetGrid();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] !== start && grid[i][j] !== end) {
        if (random(1) < 0.3) {
          grid[i][j].wall = true;
        }
      }
    }
  }
  document.getElementById('status-message').innerText = "Walls randomized. Press Start.";
}

function reconstructPath(current) {
  path = [];
  let temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
}

function heuristic(a, b) {
  return dist(a.i, a.j, b.i, b.j);
}

function Node(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  this.show = function (col) {
    stroke(200); // Add light grey stroke to see grid
    if (this.wall) {
      fill(50); // Dark Grey for walls
      rect(this.i * w, this.j * h, w - 1, h - 1);
    } else if (col) {
      fill(col);
      rect(this.i * w, this.j * h, w - 1, h - 1);
    }
  }

  this.addNeighbors = function (grid) {
    let i = this.i;
    let j = this.j;
    if (i < cols - 1) this.neighbors.push(grid[i + 1][j]);
    if (i > 0) this.neighbors.push(grid[i - 1][j]);
    if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
    if (j > 0) this.neighbors.push(grid[i][j - 1]);

    // Diagonals
    if (i > 0 && j > 0) this.neighbors.push(grid[i - 1][j - 1]);
    if (i < cols - 1 && j > 0) this.neighbors.push(grid[i + 1][j - 1]);
    if (i > 0 && j < rows - 1) this.neighbors.push(grid[i - 1][j + 1]);
    if (i < cols - 1 && j < rows - 1) this.neighbors.push(grid[i + 1][j + 1]);
  }
}