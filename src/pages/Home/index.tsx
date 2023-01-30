import {
  Play,
  HandPalm,
  Pause,
  PlayCircle,
  Clock,
  ArrowCounterClockwise,
  Check,
} from "phosphor-react";
import {
  AlertCronometro,
  AlertTemporizador,
  CircleRelogio,
  ContentAlertRelogio,
  ControlsButtonContainer,
  HomeContainer,
  PauseCountdownButton,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { useForm, FormProvider } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import soundAlarm from "../../assets/alarm.wav";
import NewCycleForm from "./components/NewCycleForm";
import Countdown from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";
import { differenceInSeconds, format } from "date-fns";
import { secondsInDay } from "date-fns/constants";
const newCycleFormSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo precisa ser de no mínimo 1 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>;

export function Home() {
  const {
    createNewCycle,
    interruptCurrentCycle,
    pauseCurrentCycle,
    markCurrentCycleAsFinished,
    setProgressBar,
    activeCycle,
  } = useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const [hours, setHours] = useState({
    minutes: "",
    seconds: "",
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch("task");
  const minutesAmount = watch("minutesAmount");
  const isSubmitDisabled = !task || !minutesAmount;

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data);
    reset();
  };

  // Temporizador
  const secondsDifference = differenceInSeconds(
    new Date(),
    new Date(activeCycle?.startDate)
  );

  const totalSeconds = activeCycle?.minutesAmount * 60;
  const finish = !activeCycle?.stopWatch
    ? secondsDifference >= totalSeconds
    : false;

  const syncHoursAndMinutes = (minutes, seconds) => {
    setHours({
      minutes,
      seconds,
    });
  };

  const finishCount = () => {
    markCurrentCycleAsFinished();
    setProgressBar(100);
  };

  const restartCount = () => {
    const data = {
      task: activeCycle?.task,
      minutesAmount: activeCycle?.minutesAmount,
    };
    markCurrentCycleAsFinished();
    setProgressBar(100);
    createNewCycle(data);
  };

  useEffect(() => {
    let soundInterval: number;
    if (finish) {
      new Audio(soundAlarm).play();
      soundInterval = setInterval(() => {
        new Audio(soundAlarm).play();
      }, 2500);
    }

    return () => clearInterval(soundInterval);
  }, [finish]);

  return (
    <HomeContainer className="">
      <AlertTemporizador className={`${finish ? "active" : ""}`}>
        <CircleRelogio>
          <Clock size={28} />
        </CircleRelogio>
        <ContentAlertRelogio>
          <div>
            Relógio{" "}
            <small>
              <sup>{format(new Date(), "HH:mm")}</sup>
            </small>
          </div>
          <span>{activeCycle?.minutesAmount} m</span>
          <h1 className="display">
            - {hours.minutes}:{hours.seconds}
          </h1>
          <div className="buttons">
            <a onClick={finishCount}>Finalizar</a>
            <span></span>
            <a onClick={restartCount}>Reiniciar</a>
          </div>
        </ContentAlertRelogio>
      </AlertTemporizador>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown
          syncHoursAndMinutes={(minutes, seconds) =>
            syncHoursAndMinutes(minutes, seconds)
          }
        />
        {activeCycle && !activeCycle.stopWatch ? (
          <ControlsButtonContainer>
            <StopCountdownButton
              onClick={() => {
                finish ? finishCount() : interruptCurrentCycle();
              }}
              type="button"
            >
              {finish ? <Check size={24} /> : <HandPalm size={24} />}
              {finish ? "Finalizar" : "Interromper"}
            </StopCountdownButton>
            <PauseCountdownButton
              onClick={() => {
                finish ? restartCount() : pauseCurrentCycle();
              }}
              type="button"
            >
              {finish ? (
                <ArrowCounterClockwise size={24} />
              ) : activeCycle.paused ? (
                <PlayCircle size={24} color="#000" />
              ) : (
                <Pause size={24} color="#000" />
              )}

              {finish ? "Reiniciar" : activeCycle.paused ? "Retomar" : "Pausar"}
            </PauseCountdownButton>
          </ControlsButtonContainer>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
