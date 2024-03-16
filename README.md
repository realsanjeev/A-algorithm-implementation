# A* Algorithm
This code implements the A* algorithm in JavaScript using p5.js, a JavaScript library for creating graphics and animations. The algorithm finds the shortest path between a start and end point on a 2D grid, taking into account the terrain (walls) between them.

## Algorithm
The A* algorithm can be described in a more mathematical form as follows:

Given:
- $ G $: Graph representing the environment
- $ S $: Starting node
- $ D $: Destination node
- $ h(n) $: Heuristic function estimating the cost from node $ n $ to the destination node $ D $
- $ g(n) $: Actual cost from the starting node $ S $ to node $ n $
- $ f(n) $: Evaluation function combining $ g(n) $ and $ h(n) $, defined as $ f(n) = g(n) + h(n) $
- $ Q $: Priority queue containing nodes to be explored, ordered by $ f(n) $

Algorithm:
1. Initialize:
   - Add $ S $ to $ Q $
   - Set $ g(S) = 0 $
   - Calculate $ h(S) $ (heuristic value from $ S $ to $ D $)
   - Calculate $ f(S) = g(S) + h(S) $
2. While $ Q $ is not empty:
   - Remove the node $ n $ with the lowest $ f(n) $ from $ Q $
   - If $ n = D $, terminate (path found)
   - Add $ n $ to the set of explored nodes
   - For each neighbor $ m $ of $ n $:
     - If $ m $ is not traversable or $ m $ is in the set of explored nodes, skip to the next neighbor
     - Calculate tentative $ g(m) $ from $ S $ to $ m $
     - If $ m $ is not in $ Q $ or $ tentative \, g(m) $ is less than the current $ g(m) $:
       - Update $ g(m) $ to tentative $ g(m) $
       - Calculate $ h(m) $ (heuristic value from $ m $ to $ D $)
       - Calculate $ f(m) = g(m) + h(m) $
       - Set the parent of $ m $ to $ n $
       - Add $ m $ to $ Q $
3. If the loop terminates without finding $ D $, there is no path from $ S $ to $ D $

The algorithm aims to minimize the $ f(n) $ value by considering both the actual cost $ g(n) $ and the estimated cost $ h(n) $ to reach the destination node $ D $. By iteratively exploring nodes with the lowest $ f(n) $, $A^*$ efficiently finds the shortest path from $ S $ to $ D $.

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
