export enum TileType {
  Gem = "Gem",
  Mine = "mine",
}

export enum TileStatus {
  Activable = "Activable",
  Activated = "Activated",
  Uncovered = "Uncovered",
}

export interface GameConfig {
  /**
   * The size of the game board (grid x grid).
   */
  grid: number;
  /**
   * Total number of mines on the board.
   */
  mines: number;
  /**
   * Total tiles on board (grid², computed).
   */
  readonly totalTiles: number;
  /**
   * Safe tiles remaining (tiles - mines, computed).
   */
  readonly gems: number;
}
