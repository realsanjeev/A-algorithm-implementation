# A* Pathfinding Visualization

This project is an interactive visualization of the **A\* Pathfinding Algorithm**, implemented in JavaScript using the [p5.js](https://github.com/processing/p5.js) library. It demonstrates how the algorithm finds the shortest path between two points on a grid, navigating around obstacles.

## Features

-   **Interactive Grid**:
    -   **Draw Walls**: Click and drag on the grid to create obstacles.
    -   **Randomize**: Generate random wall patterns with a single click.
    -   **Clear**: Reset the grid to a blank state.
-   **Real-time Visualization**: Watch the algorithm explore nodes (green) and find the optimal path (blue).
-   **Optimized Performance**: Uses a **Min-Heap** data structure for the open set, ensuring efficient node retrieval ($O(\log N)$) compared to a standard array ($O(N)$).
-   **Responsive Design**: The grid adapts to the canvas size.

## Getting Started

1.  **Open the Application**: Simply open `index.html` in your modern web browser.
    
    Alternatively, you can serve it locally:
    ```bash
    python3 -m http.server 8000
    ```
    Then open `http://localhost:8000` in your browser.
2.  **Controls**:
    -   **Start**: Begins the pathfinding visualization.
    -   **Reset Path**: Clears the current path and search data, keeping the walls intact.
    -   **Clear Walls**: Removes all walls and resets the grid.
    -   **Randomize Walls**: Adds random obstacles to the grid.
3.  **Interact**: Click and drag your mouse across the grid to draw custom walls before starting the algorithm.

## Algorithm Details

The $A^*$ (A-Star) algorithm is a powerful and widely used pathfinding algorithm that finds the shortest path between a starting node and a target node. It is an informed search algorithm, meaning it uses a heuristic to guide its search.

### Core Concepts

The algorithm minimizes the total estimated cost of a path, defined by the function:

$$f(n) = g(n) + h(n)$$

-   **$g(n)$**: The actual cost to reach node $n$ from the start node. In this grid, moving to an adjacent cell (up, down, left, right) or a diagonal cell has a cost.
-   **$h(n)$**: The heuristic estimated cost from node $n$ to the goal. This implementation uses the **Euclidean Distance** (straight-line distance), which is admissible and consistent, ensuring the shortest path is found.
-   **$f(n)$**: The total estimated cost of the path through node $n$.

### Step-by-Step Process

1.  **Initialization**:
    -   The algorithm begins by adding the **Start Node** to the `openSet`.
    -   The `openSet` is a priority queue (implemented here as a **Min-Heap**) that orders nodes by their lowest $f(n)$ score.

2.  **Selection**:
    -   The algorithm repeatedly extracts the node with the lowest $f(n)$ score from the `openSet`. Let's call this node `current`.

3.  **Termination Check**:
    -   If `current` is the **End Node**, the path has been found! The algorithm stops and reconstructs the path by backtracking through the `previous` pointers.

4.  **Exploration**:
    -   The `current` node is moved to the `closedSet` (conceptually, a set of visited nodes) to avoid re-processing.
    -   The algorithm then looks at all valid **neighbors** of `current` (up, down, left, right, and diagonals).

5.  **Relaxation**:
    -   For each neighbor:
        -   If it is a **Wall** or already in the `closedSet`, it is ignored.
        -   A tentative $g$ score is calculated: `tempG = current.g + distance(current, neighbor)`.
        -   If this path to the neighbor is shorter than any previously found path (or if the neighbor is being visited for the first time):
            -   Update the neighbor's $g$ score to `tempG`.
            -   Calculate the neighbor's $h$ score (distance to goal).
            -   Calculate the neighbor's $f$ score ($g + h$).
            -   Set the neighbor's `previous` parent to `current`.
            -   Add the neighbor to the `openSet` if it's not already there.

6.  **No Solution**:
    -   If the `openSet` becomes empty and the End Node has not been reached, there is no possible path (e.g., the target is completely walled off).

### Implementation Note: Min-Heap Optimization
A standard array implementation of the `openSet` would require scanning the entire array to find the lowest $f$ score, resulting in $O(N)$ time complexity for each selection step.
This project uses a **Min-Heap**, which allows us to retrieve the lowest $f$ score node in **$O(\log N)$** time. This makes the algorithm significantly faster, especially on larger grids or complex mazes.

## References

-   [p5.js - Official Website](https://p5js.org/)
-   [A* Search Algorithm - Wikipedia](https://en.wikipedia.org/wiki/A*_search_algorithm)
-   [Introduction to A* - Red Blob Games](https://www.redblobgames.com/pathfinding/a-star/introduction.html)

## Contact Me

<table>
  <tr>
    <td><a href="https://www.instagram.com/realsanjeev/"><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/instagram.png?raw=true" alt="Instagram" width="50" height="50"></a></td>
    <td><a href="https://twitter.com/realsanjeev"><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/twitter.png?raw=true" alt="Twitter" width="50" height="50"></a></td>
    <td><a href="https://github.com/realsanjeev"><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/github.png?raw=true" alt="GitHub" width="50" height="50"></a></td>
    <td><a href="https://www.linkedin.com/in/realsanjeev/"><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/linkedin-logo.png?raw=true" alt="LinkedIn" width="50" height="50"></a></td>
  </tr>
</table>
