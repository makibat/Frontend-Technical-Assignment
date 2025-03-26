"use client";

import classNames from "classnames";

import { TileStatus, TileType } from "@/types";
import Gem from "@public/assets/Gem.png";
import Mine from "@public/assets/Mine.png";
import { TileImage } from "./TileImage";

import styles from "./tile.module.scss";

interface TileProps {
  status: TileStatus;
  type: TileType;
  onClick: () => void;
  disabled: boolean;
}

export function Tile({ status, type, disabled, onClick }: TileProps) {
  const isActivable = status === TileStatus.Activable;
  const isActivated = status === TileStatus.Activated;
  const isUncovered = status === TileStatus.Uncovered;

  const isGem = type === TileType.Gem;
  const isMine = type === TileType.Mine;

  return (
    <button
      type="button"
      aria-label={isActivated ? (isMine ? "Mine" : "Gem") : "Tile"}
      className={classNames(
        styles.base,
        !isActivable && (isGem ? styles.gem : styles.mine),
        isUncovered && styles.uncovered,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {!isActivable &&
        (isGem ? <TileImage src={Gem} /> : <TileImage src={Mine} />)}
    </button>
  );
}
