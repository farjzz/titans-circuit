# Titan's Circuit

**Titan’s Circuit** is a two-player, turn-based strategy game built with **HTML, CSS, and Vanilla JavaScript**
Players compete by placing and moving Titans across a concentric hexagonal grid to capture weighted edges, score points, and outwit their opponent within strict time limits.

## Objective
Control edges of the hexagonal board by placing and moving your Titans.  
The player with the **highest score** at the end of the game wins.

## How to Open and Run the Game

1. **Clone the repository**  
   git clone https://github.com/farjz/titans-circuit.git
   cd titans-circuit
2. **Run the game in your browser**  
   Locate the index.html file in the folder
   Double click and open it with a modern browser (Chrome, Firefox, etc)

## Gameplay

- The board has **three concentric hexagonal circuits**  
- Each player (Red and Blue) has **4 Titans** to place
- Each edge has a weight. Owning both ends of an edge adds score equal to the weight of the edge to the player
- During their turn, the player can either place a new titan (if available) or move an existing titan to another node connected by an edge
- Unless the outer circuit is completely filled, the circuits inside it are blocked (movement/placement of titans isn't allowed)
- The game ends if the overall timer ends or the innermost circuit is fully occupied


## Controls
- **Place a Titan:** Click an available node on your turn  
- **Select a Titan:** Click one of your own Titans (it will highlight) 
- **Move a Titan:** After selecting, click a connected empty node to move 
- **Deselect:** Click the same Titan again to deselect
- **Buttons:**  
  - Pause
  - Resume
  - Reset
