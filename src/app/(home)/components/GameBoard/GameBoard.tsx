"use client";

import React, { useImperativeHandle, useState } from "react";

import { GameConfig, TileStatus, TileType } from "@/types";
import { Tile } from "@/components/ui";
import { Popup, PopupProps } from "./Popup";

import styles from "./game-board.module.scss";

type TileState = {
  id: number;
  type: TileType;
  status: TileStatus;
};

export interface GameBoardRef {
  resetGame: () => void;
  setPopupData: React.Dispatch<React.SetStateAction<PopupProps>>;
  activatePopup: () => void;
}

interface GameBoardProps {
  /**
   * The game configuration object containing board settings and derived properties.
   * @example
   * {
   *   grid: 5,         // 5x5 board
   *   mines: 3,        // 3 mines
   *   totalTiles: 25,  // 5*5
   *   gems: 22         // 25-3
   * }
   */
  config: GameConfig;

  /**
   * Indicator that represents current game state.
   */
  isGameInProgress: boolean;

  /**
   * Update number of activated tiles that contain Gem.
   */
  setGems: React.Dispatch<React.SetStateAction<number>>;

  /**
   * Update number of activated tiles that contain Mine.
   */
  setMines: React.Dispatch<React.SetStateAction<number>>;

  /**
   * The game configuration object containing board settings and derived properties.
   */
  onMultiplierUpdate: (n: number) => void;

  /**
   * Callback triggered when game ends (win/lose condition met).
   */
  onGameEnd: () => void;
}

export const GameBoard = React.forwardRef(
  (
    {
      config,
      isGameInProgress,
      setGems,
      setMines,
      onMultiplierUpdate,
      onGameEnd,
    }: GameBoardProps,
    ref,
  ) => {
    if (config.mines < 3) throw new Error("Insufficient number of mines.");
    if (config.mines >= config.totalTiles) throw new Error("Too many mines.");

    // Board state.
    const [tiles, setTiles] = useState<TileState[]>(initalizeNewGame);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<PopupProps>({
      multiplier: 0,
      amount: 0,
    });

    /**
     * Initializes game state with randomized mine positions.
     * @returns {TileState[]} Array of tile objects with mines and gems.
     * @note First creates ordered array then shuffles positions.
     */
    function initalizeNewGame(): TileState[] {
      // Create array with first 'mines' elements as mines, rest as gems.
      const newTiles = Array.from({ length: config.totalTiles }, (_, i) => ({
        id: i,
        type: i < config.mines ? TileType.Mine : TileType.Gem,
        status: TileStatus.Activable,
      }));

      // Place mines randomly using Fisher-Yates algorithm.
      let i = config.totalTiles;
      let j;
      let temp;

      while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = newTiles[j];
        newTiles[j] = newTiles[i];
        newTiles[i] = temp;
      }

      return newTiles;
    }

    /**
     * Triggers cashout popup visibility.
     */
    function activatePopup() {
      setIsPopupOpen(true);
    }

    /**
     * Resets game to initial state.
     * @desc Reinitializes tiles and clears game over state.
     */
    function resetGame() {
      setTiles((prevTiles) =>
        prevTiles.map((tile) =>
          tile.status !== TileStatus.Activated
            ? { ...tile, status: TileStatus.Uncovered }
            : tile,
        ),
      );

      setTimeout(() => {
        setTiles(initalizeNewGame);
        setIsPopupOpen(false);
        onGameEnd();
      }, 2000);
    }

    useImperativeHandle(ref, () => ({
      resetGame,
      setPopupData,
      activatePopup,
    }));

    /**
     * Handles tile click interactions.
     * @param {number} id - Index of clicked tile in tiles array.
     */
    function updateTile(id: number) {
      // Update activated Tile status.
      setTiles((prevTiles) =>
        prevTiles.map((tile) =>
          tile.id === id ? { ...tile, status: TileStatus.Activated } : tile,
        ),
      );

      // Update Tile count.
      if (tiles.find((tile) => tile.id === id)?.type === TileType.Mine) {
        // Check for hit Mine.
        setMines((prev) => prev - 1);

        resetGame();
      } else {
        // Update Gem count.
        // Update multiplier according to the following formula:
        // multiplier = 1 + (0.2 * [number of opened tiles])
        setGems((prev) => {
          const currGemCount = prev - 1;
          onMultiplierUpdate(
            Number((1 + 0.2 * (config.totalTiles - currGemCount)).toFixed(2)),
          );

          return currGemCount;
        });
      }
    }

    return (
      <div className={styles.wrapper}>
        {isPopupOpen && (
          <Popup multiplier={popupData.multiplier} amount={popupData.amount} />
        )}
        <div
          className={styles.container}
          style={
            {
              "--grid": `${config.grid}`,
            } as React.CSSProperties
          }
        >
          {tiles.map(({ status, type, id }) => (
            <Tile
              key={`tile-${id}`}
              status={status}
              type={type}
              onClick={() => updateTile(id)}
              disabled={!isGameInProgress || status !== TileStatus.Activable}
            />
          ))}
        </div>
      </div>
    );
  },
);

GameBoard.displayName = "GameBoard";
