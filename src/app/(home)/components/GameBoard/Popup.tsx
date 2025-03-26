import { toDecimalNumber } from "@/utils";
import styles from "./game-board.module.scss";

export interface PopupProps {
  multiplier: number;
  amount: number;
}

export function Popup({ multiplier, amount }: PopupProps) {
  return (
    <div className={styles.popup_container}>
      <div className={styles.popup_message}>
        <span className={styles.multiplier}>
          {toDecimalNumber(multiplier)}x
        </span>
        <span className={styles.won}>{toDecimalNumber(amount)} EUR</span>
      </div>
    </div>
  );
}
