import React, { useContext, useEffect, useRef, useState } from "react";
import {
  addHours,
  addMinutes,
  addSeconds,
  differenceInMinutes,
  differenceInSeconds,
  format,
  formatISO9075,
  min,
  parse,
  subHours,
  subMinutes,
  subSeconds,
} from "date-fns";
import {
  CircleProgressBar,
  CircleShadowProgressBar,
  CountdownClock,
  CountdownContainer,
  Separator,
} from "./styles";
import { CyclesContext } from "../../../../contexts/CyclesContext";

interface ICountdownProps {
  syncHoursAndMinutes: (minutes: string, seconds: string) => void;
}

const Countdown = ({ syncHoursAndMinutes }: ICountdownProps) => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
    setProgressBar,
    progress,
  } = useContext(CyclesContext);

  const secondsDifferenceIsPaused =
    differenceInSeconds(new Date(), new Date(activeCycle?.lastDateIsPaused)) ||
    0;

  const [totalSeconds, setTotalSeconds] = useState(() => {
    if (!activeCycle) return 0;
    return activeCycle
      ? activeCycle.minutesAmount * 60 + secondsDifferenceIsPaused
      : 0;
  });

  const [expectedDatesShow, setExpectedDatesShow] = useState(false);

  useEffect(() => {
    if (activeCycle?.paused) return;
    setTotalSeconds(activeCycle ? activeCycle.minutesAmount * 60 : 0);
  }, [activeCycle]);

  const currentSeconds = activeCycle
    ? Number(totalSeconds.toFixed(2)) - amountSecondsPassed
    : 0;

  const minutesAmount =
    currentSeconds < 0
      ? Math.ceil(currentSeconds / 60)
      : Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes =
    currentSeconds < 0
      ? String(minutesAmount).replace(/\D/g, "").padStart(2, "0")
      : String(minutesAmount).replace(/\D/g, "").padStart(2, "0");
  const seconds = String(Math.abs(secondsAmount)).padStart(2, "0");

  const progressCircle = useRef(null);

  useEffect(() => {
    syncHoursAndMinutes(minutes, seconds);
  }, [minutes, seconds]);

  let radius = 170;

  if (window.matchMedia("(max-width: 768px)").matches) {
    radius = 140;
  }

  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    if (activeCycle) {
      document.title =
        amountSecondsPassed > totalSeconds
          ? `-${minutes}:${seconds}`
          : `${minutes}:${seconds}`;
      return;
    }
    document.title = "Alarm App";
  }, [minutes, seconds, activeCycle]);

  useEffect(() => {
    if (!progressCircle.current) return;
    progressCircle.current.style.strokeDasharray = circumference;

    setProgress(progress);
  }, [progress]);

  function setProgress(percent: number) {
    if (!progressCircle.current) return;

    progressCircle.current.style.strokeDashoffset =
      circumference - (percent / 100) * circumference;
  }

  const dateExpected = addMinutes(
    activeCycle?.startDate ? new Date(activeCycle?.startDate) : new Date(),
    activeCycle?.minutesAmount || 0
  );

  useEffect(() => {
    if (!activeCycle?.paused) {
      dateExpected && setExpectedDatesShow(format(dateExpected, "HH:mm"));
    }
  }, [dateExpected]);

  useEffect(() => {
    let idInterval: number;

    if (activeCycle && !activeCycle.paused && !activeCycle.stopWatch) {
      idInterval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        setProgressBar((currentSeconds / totalSeconds) * 100);
        setSecondsPassed(secondsDifference);
      }, 0);
    }

    let intervalIsPaused: number;
    if (activeCycle?.paused && !activeCycle.stopWatch) {
      intervalIsPaused = setInterval(() => {
        let dateExpected;
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.paused)
        );

        dateExpected = addSeconds(
          new Date(activeCycle.paused),
          secondsDifference
        );
        dateExpected = addSeconds(
          new Date(dateExpected),
          activeCycle.minutesAmount * 60 - amountSecondsPassed
        );
        dateExpected && setExpectedDatesShow(format(dateExpected, "HH:mm"));
      }, 1000);
    }

    return () => {
      clearInterval(idInterval);
      clearInterval(intervalIsPaused);
    };
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished]);

  return (
    <CountdownContainer>
      {activeCycle?.minutesAmount ? `${activeCycle.minutesAmount} m` : ""}
      <CountdownClock>
        <span>{currentSeconds < 0 ? `-` + minutes[0] : minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownClock>
      {activeCycle?.startDate ? expectedDatesShow : ""}
      <svg width="450" height="450">
        <CircleShadowProgressBar className="track" />
        <CircleProgressBar
          activeCycle={activeCycle && !activeCycle.stopWatch ? activeCycle : ""}
          currentSeconds={currentSeconds}
          ref={progressCircle}
          className="track"
          rotate="-90deg"
        />
      </svg>
    </CountdownContainer>
  );
};

export default Countdown;
