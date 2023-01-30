import { differenceInMilliseconds } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import {
  StopButton,
  CanceledButton,
  ControlStopWatch,
  StopWatchContainer,
  StopWatchContent,
} from "./styles";

const StopWatch = () => {
  const {
    activeCycle,
    createNewCycle,
    interruptCurrentCycle,
    pauseCurrentCycle,
  } = useContext(CyclesContext);
  const [hours, setHours] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    centesimo: "00",
  });

  const finishStopWatch = () => {
    setHours({
      minutes: "00",
      seconds: "00",
      centesimo: "00",
    });
    interruptCurrentCycle();
  };
  let totalMilliseconds;
  if (activeCycle?.paused) {
    totalMilliseconds = differenceInMilliseconds(
      new Date(activeCycle?.paused),
      new Date(activeCycle?.startDate)
    );
  } else {
    totalMilliseconds = differenceInMilliseconds(
      new Date(),
      new Date(activeCycle?.startDate)
    );
  }

  const centesimo = totalMilliseconds ? Math.floor(totalMilliseconds / 10) : 0;
  const seconds = totalMilliseconds ? Math.floor(totalMilliseconds / 1000) : 0;
  const minutes = seconds ? Math.floor(seconds / 60) : 0;

  const minutesAmount = String(minutes).padStart(2, "0");
  const centesimoAmount = String(centesimo % 100).padStart(2, "0");
  const secondsAmount = String(seconds % 60).padStart(2, "0");

  useEffect(() => {
    let idInterval: number;
    if (activeCycle?.paused) {
      setHours({
        minutes: minutesAmount,
        seconds: secondsAmount,
        centesimo: centesimoAmount,
      });
    }
    if (
      activeCycle?.startDate &&
      activeCycle.stopWatch &&
      !activeCycle.paused
    ) {
      idInterval = setInterval(() => {
        setHours({
          minutes: minutesAmount,
          seconds: secondsAmount,
          centesimo: centesimoAmount,
        });
      }, 30);

      document.title = `${minutesAmount}:${hours.seconds}`;
    }

    if (!activeCycle) {
      document.title = "Alarm App";
    }

    return () => clearInterval(idInterval);
  }, [minutes, seconds, centesimo, activeCycle]);

  return (
    <StopWatchContainer>
      <StopWatchContent>
        <span>{hours.minutes[0]}</span>
        <span>{hours.minutes[1]}</span>:<span>{hours.seconds[0]}</span>
        <span>{hours.seconds[1]}</span>:<span>{hours.centesimo[0]}</span>
        <span>{hours.centesimo[1]}</span>
      </StopWatchContent>
      {!activeCycle || !activeCycle?.stopWatch ? (
        <CanceledButton
          disabled={activeCycle}
          onClick={() =>
            createNewCycle({ minutesAmount: "", task: "", stopWatch: true })
          }
        >
          Iniciar
        </CanceledButton>
      ) : (
        <ControlStopWatch>
          <CanceledButton className="active" onClick={finishStopWatch}>
            Parar
          </CanceledButton>
          <StopButton onClick={pauseCurrentCycle}>
            {activeCycle.paused ? "Retomar" : "Pausar"}
          </StopButton>
        </ControlStopWatch>
      )}
    </StopWatchContainer>
  );
};

export default StopWatch;
