import { generateDepositId } from "@/helpers";
import { createSlice } from "@reduxjs/toolkit";

export interface DepositInterface {
  name: string;
  amount: number;
  id: string;
  date: Date;
}

export interface PortfolioHistory {
  cash: number;
  datetime: string;
  investedAmount: number;
  investedReturn: number;
  month: string;
  savings: number;
  _id: string;
}

export interface AllInvestments {
  ticker: string;
  logo: string;
  change: number;
  allocation: number;
}

export interface PortrfolioBalance {
  invested: number;
  savings: number;
  cash: number;
}

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    balance: {
      cash: 0,
      savings: 0,
      invested: 0,
    } as PortrfolioBalance,
    investments: [] as AllInvestments[],
    history: [] as PortfolioHistory[],
    deposits: [] as DepositInterface[],
  },
  reducers: {
    addDeposit: (state, payload) => {
      state.balance = {
        cash: state.balance.cash + +payload.payload.deposit.cash,
        savings: state.balance.savings + +payload.payload.deposit.savings,
        invested: state.balance.invested + +payload.payload.deposit.invested,
      };
      state.deposits = [
        {
          name: payload.payload.deposit.name,
          amount: payload.payload.deposit.amount,
          id: payload.payload.deposit.id,
          date: payload.payload.deposit.date,
        },
        ...state.deposits,
      ];
      state.history[state.history.length - 1].cash +=
        +payload.payload.deposit.cash;
      state.history[state.history.length - 1].investedAmount +=
        +payload.payload.deposit.invested;
      state.history[state.history.length - 1].investedReturn +=
        +payload.payload.deposit.invested;
      state.history[state.history.length - 1].savings +=
        +payload.payload.deposit.savings;
    },
    addSavingsToBalance: (state, payload) => {},
    setUserPortfolio: (state, payload) => {
      state.balance = payload.payload.balance;
      state.history = payload.payload.history;
      state.deposits = payload.payload.deposits;
    },
  },
});
export const portfolioAction = portfolioSlice.actions;
