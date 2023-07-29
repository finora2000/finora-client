import { generateDepositId } from "@/helpers";
import { createSlice, current } from "@reduxjs/toolkit";
import { portfolioSlice } from "./portfolioSlice";

export interface Investment {
  goalId: string;
  _id: string;
  tickerName: string;
  tickerLogo: string;
  invested: number;
  returns: number;
  allocation: number;
  totalInterestGained: number;
  dayChange: number;
}

export interface GoalInterface {
  _id: string;
  name: string;
  priority: string;
  target: number;
  invested: number;
  returns: number;
  duration: string;
  totalInterestGained: number;
  dayChange: number;
  todaysGain: number;
  startDate: Date;
  endDate: Date | null;
  investments: Investment[];
}
export const goalSlice = createSlice({
  name: "Goals",
  initialState: {
    goals: [] as GoalInterface[],
    goalInvestments: [] as Investment[],
  },
  reducers: {
    addGoal: (state, payload) => {
      console.log("payload.payload", payload.payload);
      state.goals.unshift({
        name: payload.payload.goal.name,
        target: payload.payload.goal.target,
        priority: payload.payload.goal.priority,
        duration: payload.payload.goal.duration,
        invested: 0,
        returns: 0,
        totalInterestGained: 0,
        dayChange: 0,
        todaysGain: 0,
        startDate: new Date(),
        endDate: null,
        investments: payload.payload.investments,
        _id: payload.payload.goal._id,
      });
    },
    addDepositToGoal: (state, payload) => {
      console.log("payload", payload.payload);
      Object.entries(payload.payload).forEach((i) => {
        const goalId = i[0];
        const amount = i[1] as number;
        const goalIndex = current(state.goals).findIndex(
          (g) => goalId === g._id
        );
        console.log("goalIndex", goalIndex);
        let updatedGoal = structuredClone(current(state.goals)[goalIndex]);
        console.log(
          "updatedGoal",
          updatedGoal,
          updatedGoal.investments,
          goalId
        );

        updatedGoal.invested += +amount;
        updatedGoal.returns += +amount;

        updatedGoal.investments = updatedGoal.investments.map((inv) => {
          return {
            ...inv,
            invested: inv.invested + amount * inv.allocation,
            returns: inv.returns + amount * inv.allocation,
          };
        });
        state.goals[goalIndex] = updatedGoal;
      });
    },
    setGoals: (state, payload) => {
      const populatedGoals = payload.payload.goals.map(
        (goal: GoalInterface) => {
          const investments: Investment[] = payload.payload.investments;
          return {
            ...goal,
            test: null,
            investments: investments.filter((o) => o.goalId !== goal._id),
          };
        }
      );
      state.goalInvestments = payload.payload.investments.flat();
      state.goals = populatedGoals;
    },
  },
});
export const goalsAction = goalSlice.actions;
