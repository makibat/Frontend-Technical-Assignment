"use client";

import { useUserContext } from "@/providers/ContextProvider";
import Chevron from "@public/icons/Chevron.svg";
import styles from "./navbar.module.scss";

export function Navbar() {
  const { state } = useUserContext();

  return (
    <header className={styles.base_wrapper}>
      <div className={styles.base_container}>
        <button type="button" className={styles.button}>
          <Chevron />
        </button>
        <div className={styles.balance_wrapper}>
          <div className={styles.balance}>BALANCE</div>
          <div>
            <span>{state.currency}</span>
            <span>{state.balance}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
