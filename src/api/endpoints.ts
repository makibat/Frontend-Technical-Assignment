import { CUSTOMER_ID, SESSION_ID, TOKEN } from "@/config";
import { api } from "./api";

/* ── FetchWalletBalance ---------------------------------------------------- */
export interface IFetchWalletBalance {
  status: {
    code: "VALID";
    error: boolean;
    error_message: string;
  };
  balance: number;
  currency: "EUR";
}

export async function FetchWalletBalance() {
  const response = await api.post<IFetchWalletBalance>(
    "user-wallet/v1/gaming/sessions/balance",
    {
      json: {
        provider: "Hogamba",
        customer: {
          id: CUSTOMER_ID,
          token: TOKEN,
        },
      },
    },
  );

  return response.json();
}

/* ── Place Bet (Debit Transaction) ----------------------------------------- */
export interface IPlaceBet {
  status: {
    code: "VALID";
    error: boolean;
    error_message: string;
  };
  balance: number;
  currency: "EUR";
  transaction_id: string;
  internal_transaction_id: string;
  free_spins: number;
}

export async function PlaceBet(amount: number) {
  const response = await api.post<IPlaceBet>(
    "user-wallet/v1/gaming/transactions/debit",
    {
      json: {
        transaction: {
          provider: "Hogamba",
          customer: {
            id: CUSTOMER_ID,
            token: TOKEN,
            session_id: SESSION_ID,
          },
          game_id: "hogamba_mines",
          spin_id: "spin_1234",
          external_id: "external_1234",
          amount,
          currency: "EUR",
        },
        free_spin: false,
      },
    },
  );

  return response.json();
}

/* ── Process Cashout (Credit Transaction) ---------------------------------- */
export interface IProcessCashout {
  status: {
    code: "VALID";
    error: boolean;
    error_message: string;
  };
  balance: number;
  currency: "EUR";
  transaction_id: string;
  internal_transaction_id: string;
  free_spins: number;
}

export function ProcessCashout(amount: number) {
  const response = api.post<IProcessCashout>(
    "user-wallet/v1/gaming/transactions/credit",
    {
      json: {
        transaction: {
          provider: "Hogamba",
          customer: {
            id: CUSTOMER_ID,
            token: TOKEN,
            session_id: SESSION_ID,
          },
          game_id: "hogamba_mines",
          spin_id: "spin_1234",
          external_id: "external_1234",
          amount,
          currency: "EUR",
        },
        jackpot: false,
      },
    },
  );

  return response.json();
}
