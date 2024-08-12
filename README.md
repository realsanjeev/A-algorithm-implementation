# A* Algorithm
This code implements the $A^*$ algorithm in JavaScript using `p5.js`, a JavaScript library for creating graphics and animations. The algorithm finds the shortest path between a start and end point on a 2D grid, taking into account the terrain (walls) between them.

**References**
- [p5.js - Github](https://github.com/processing/p5.js)
- [p5.js - Official website](https://p5js.org/tutorials/)
- [Understanding the A-star Algorithm](https://www.redblobgames.com/pathfinding/a-star/introduction.html)

## Algorithm
The $A^*$ algorithm seeks to minimize the evaluation function $f(n)$ by combining the actual cost $g(n)$ and the heuristic estimate $h(n)$. By prioritizing nodes with the lowest $f(n)$, $A^*$ efficiently identifies the shortest path from $S$ to $D$.

The $A^*$ algorithm can be described mathematically as follows:

**Given:**
- $G$: A graph representing the environment
- $S$: The starting node
- $D$: The destination node
- $h(n)$: A heuristic function estimating the cost from node $n$ to the destination node $D$
- $g(n)$: The actual cost from the starting node $S$ to node $n$
- $f(n)$: The evaluation function defined as $f(n) = g(n) + h(n)$
- $Q$: A priority queue containing nodes to be explored, ordered by $f(n)$

**Algorithm:**
1. **Initialization:**
   - Add $S$ to $Q$
   - Set $g(S) = 0$
   - Compute $h(S)$ (the heuristic estimate from $S$ to $D$)
   - Compute $f(S) = g(S) + h(S)$

2. **Main Loop:**
   - While $Q$ is not empty:
     - Remove the node $n$ with the lowest $f(n)$ from $Q$
     - If $n$ is the destination node $D$, terminate (path found)
     - Add $n$ to the set of explored nodes
     - For each neighbor $m$ of $n$:
       - If $m$ is not traversable or is in the set of explored nodes, skip to the next neighbor
       - Compute the tentative cost $g(m)$ from $S$ to $m$
       - If $m$ is not in $Q$ or the tentative $g(m)$ is less than the current $g(m)$:
         - Update $g(m)$ to the tentative value
         - Compute $h(m)$ (the heuristic estimate from $m$ to $D$)
         - Compute $f(m) = g(m) + h(m)$
         - Set $m$'s parent to $n$
         - Add $m$ to $Q$

3. **Termination:**
   - If the loop exits without finding $D$, conclude that there is no path from $S$ to $D$.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request.

## Contact Me

<table>
  <tr>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/instagram.png" alt="Instagram" width="50" height="50"></td>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/twitter.png" alt="Twitter" width="50" height="50"></td>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/github.png" alt="GitHub" width="50" height="50"></td>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/linkedin-logo.png" alt="LinkedIn" width="50" height="50"></td>
  </tr>
</table>
