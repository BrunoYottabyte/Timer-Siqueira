import React, { useContext, useEffect, useRef, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { CountdownContainer, Separator } from "./styles";
import { CyclesContext } from "../../../../contexts/CyclesContext";

const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext);
  const [percent, setPercent] = useState(100);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  const progressCircle = useRef(null);
  const radius = progressCircle.current?.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`;
  }, [minutes, seconds, activeCycle]);

  useEffect(() => {
    let idInterval: number;
    setPercent((currentSeconds / totalSeconds) * 100);
    if (activeCycle) {
      idInterval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(idInterval);
          setPercent(0);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(idInterval);
    };
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished]);

  useEffect(() => {
    if (!progressCircle.current) return;
    progressCircle.current.style.strokeDasharray = circumference;
    console.log(percent);
    setProgress(-percent);
  }, [percent]);

  function setProgress(percent: number) {
    if (!progressCircle.current) return;
    progressCircle.current.style.strokeDashoffset =
      circumference - (percent / 100) * circumference;
  }

  return (
    <>
      <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer>
      <svg width="250" height="250">
        <circle
          cx="125"
          cy="60"
          r="50"
          className="track"
          fill="transparent"
          stroke="#ccc"
          strokeWidth={1}
          rotate="-90deg"
        />
        <circle
          ref={progressCircle}
          cx="125"
          cy="60"
          r="50"
          strokeWidth={3}
          className="progress"
          transform="rotate(-90,125,60)"
          fill="transparent"
          stroke="red"
        />
      </svg>
    </>
  );
};

export default Countdown;
