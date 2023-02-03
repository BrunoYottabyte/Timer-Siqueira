import { differenceInSeconds } from "date-fns";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  addNewCycleAction,
  handleDeleteCycle,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
  pauseCurrentCycleAction,
} from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
  stopWatch: boolean;
}

interface ICyclesContextData {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  progress: number | string;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
  pauseCurrentCycle: () => void;
  setProgressBar: (percent: number | string) => void;
  deleteCycle: (id: string) => void;
}

export const CyclesContext = createContext({} as ICyclesContextData);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );

      if (storedStateAsJSON && typeof storedStateAsJSON !== "undefined") {
        return JSON.parse(storedStateAsJSON);
      }
      return {
        cycles: [],
        activeCycleId: null,
      };
    }
  );
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles?.find((cycle) => cycle.id === activeCycleId);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle && !activeCycle.stopWatch) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  const [progress, setProgress] = useState<string | number>(100);

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction());
  };

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  const setProgressBar = (percent: string | number) => {
    setProgress(percent);
  };

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      stopWatch: data.stopWatch ? data.stopWatch : false,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  };

  const deleteCycle = (id) => {
    dispatch(handleDeleteCycle(id));
  };

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction());
    setProgress(100);
  };

  const pauseCurrentCycle = () => {
    dispatch(pauseCurrentCycleAction());
  };

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        cycles,
        setProgressBar,
        progress,
        pauseCurrentCycle,
        deleteCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
