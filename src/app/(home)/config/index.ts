import { GameConfig } from "@/components/types";

export const config: GameConfig = {
  grid: 5,
  mines: 3,
  get totalTiles() {
    return this.grid * this.grid;
  },
  get gems() {
    return this.totalTiles - this.mines;
  },
};
