"use client";

import React, { useRef, useState, useTransition } from "react";

import { toDecimalNumber } from "@/utils";
import { Button, DisplayField, InputField } from "@/components/ui";
import { useUserContext } from "@/providers/ContextProvider";
import { config } from "../../config";
import { GameBoard, GameBoardRef } from "../GameBoard";

import styles from "./mines-game.module.scss";

export function MinesGame() {
  const { placeBet, processCashout } = useUserContext();

  // Refs.
  const gameBoardRef = useRef<GameBoardRef | null>(null);

  // State management.
  const [isActionDisabled, setIsActionDisabled] = useState(true);
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Game state.
  const [betAmount, setBetAmount] = useState(0);
  const [gems, setGems] = useState(config.gems);
  const [mines, setMines] = useState(config.mines);
  const [multiplier, setMultiplier] = useState(0);
  const [cashoutAmount, setCashoutAmount] = useState(0);

  /**
   * Handle bet amount input changes.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event.
   */
  const onBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    // Basic input range check.
    const isInRange = value >= 0 && value <= 100;

    if (value === 0) {
      setIsActionDisabled(true);
    } else {
      setIsActionDisabled(false);
    }

    if (isInRange) {
      setBetAmount(value);
    }
  };

  /**
   * Start a new game when bet is submitted.
   * @param {React.ChangeEvent<HTMLFormElement>} e - Form submit event.
   */
  const onSubmitBet = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      await placeBet(betAmount);
      setIsGameInProgress(true);
    });
  };

  /**
   * Update multiplier and calculate cashout amount.
   * @param {number} currentMultiplier - Updated multiplier value.
   */
  const onMultiplierUpdate = (currentMultiplier: number) => {
    setMultiplier(currentMultiplier);
    setCashoutAmount(betAmount * currentMultiplier);
  };

  /**
   * Handle cashout action.
   */
  const onCashout = () => {
    setIsActionDisabled(true);

    startTransition(async () => {
      await processCashout(cashoutAmount);
      if (gameBoardRef.current) {
        gameBoardRef.current.resetGame();
        gameBoardRef.current.setPopupData({
          multiplier,
          amount: cashoutAmount,
        });
        gameBoardRef.current.activatePopup();
      }
    });
  };

  /**
   * Set game back to initial state.
   */
  const onGameEnd = () => {
    setGems(config.gems);
    setMines(config.mines);
    setBetAmount(0);
    setMultiplier(0);
    setCashoutAmount(0);
    setIsGameInProgress(false);
  };

  const isCashoutDisabled = isActionDisabled
    || isPending
    || gems > config.gems - 1 // No gems revealed yet.
    || mines < config.mines; // At least one mine revealed.

  const isBetDisabled = isActionDisabled || isPending || betAmount === 0;

  return (
    <>
      <GameBoard
        ref={gameBoardRef}
        config={config}
        setMines={setMines}
        setGems={setGems}
        onMultiplierUpdate={onMultiplierUpdate}
        isGameInProgress={isGameInProgress}
        onGameEnd={onGameEnd}
      />

      {isGameInProgress ? (
        // Game Controls.
        <Button type="button" onClick={onCashout} disabled={isCashoutDisabled}>
          {`Cashout ${toDecimalNumber(cashoutAmount)} EUR`}
        </Button>
      ) : (
        // Bet Form.
        <form onSubmit={onSubmitBet}>
          <Button type="submit" disabled={isBetDisabled}>
            Bet
          </Button>
          <InputField
            label="Bet Amount"
            value={betAmount}
            onChange={onBetChange}
          />
        </form>
      )}

      {isGameInProgress && (
        // Game Status Display.
        <>
          <div className={styles.activated}>
            <DisplayField label="Mines">{mines}</DisplayField>
            <DisplayField label="Gems">{gems}</DisplayField>
          </div>
          <DisplayField label={`Total Profit (${multiplier}x)`}>
            {toDecimalNumber(cashoutAmount)}
          </DisplayField>
        </>
      )}
    </>
  );
}
