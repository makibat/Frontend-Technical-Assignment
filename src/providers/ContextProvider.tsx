"use client";

import { FetchWalletBalance, PlaceBet, ProcessCashout } from "@/api/endpoints";
import { centsToEuros, eurosToCents } from "@/utils";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ContextProviderProps {
  children: React.ReactNode;
}

type TUserState = {
  balance: number;
  currency: string;
};

type TUserContext = {
  state: TUserState; // Current user state
  placeBet: (amount: number) => void; // Function to place a bet
  processCashout: (amount: number) => void; // Function to process cashout
};

const initialContext = {
  state: {
    balance: 0,
    currency: "€",
  },
  placeBet: () => {},
  processCashout: () => {},
};

const UserContext = createContext<TUserContext>(initialContext);

export const useUserContext = () => useContext(UserContext);

export function ContextProvider({ children }: ContextProviderProps) {
  const [state, setState] = useState<TUserState>(initialContext.state);

  useEffect(() => {
    (async () => {
      try {
        // Fetch balance from API (returns balance in cents)
        const { balance } = await FetchWalletBalance();

        setState({
          balance: centsToEuros(balance),
          currency: "€",
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch wallet balance:", error);
      }
    })();
  }, []);

  /**
   * Places a bet by converting euros to cents and calling API
   * @param amount - Bet amount in euros
   */
  const placeBet = async (amount: number) => {
    try {
      const { balance } = await PlaceBet(eurosToCents(amount));

      setState((prev) => ({ ...prev, balance: centsToEuros(balance) }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to place bet:", error);
    }
  };

  /**
   * Processes cashout by converting euros to cents and calling API
   * @param amount - Cashout amount in euros
   */
  const processCashout = async (amount: number) => {
    try {
      const { balance } = await ProcessCashout(eurosToCents(amount));

      setState((prev) => ({ ...prev, balance: centsToEuros(balance) }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to process cashout:", error);
    }
  };

  return (
    <UserContext.Provider
      value={useMemo(
        () => ({
          state,
          placeBet,
          processCashout,
        }),
        [state],
      )}
    >
      {children}
    </UserContext.Provider>
  );
}
