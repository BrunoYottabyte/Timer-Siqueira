import styled from 'styled-components'

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const ControlsButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`

export const PauseCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['yellow-500']};
  color: #000;

  &:focus {
    box-shadow: none !important;
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['yellow-500']};
    filter: brightness(0.7);
  }
`

export const AlertTemporizador = styled.div`
  background-color: ${(props) => props.theme['gray-700']};
  width: 300px;
  height: 150px;
  border-radius: 16px;

  border: 2px solid ${(props) => props.theme['gray-600']};
  outline: 4px solid ${(props) => props.theme['gray-600']};
  outline-offset: 3px;

  position: absolute;
  top: 16px;
  z-index: 99;

  display: flex;
  gap: 16px;
  padding: 16px;

  @media (max-width: 668px) {
    width: 80vw;
  }

  transition: all 0.6s ease;
  top: -100%;

  &.active {
    top: 22px;
    animation: tremer 0.5s 0.58s ease forwards;
  }

  @keyframes tremer {
    15% {
      top: 31px;
    }
    40% {
      top: 24px;
    }
    60% {
      top: 28px;
    }
    80% {
      top: 26px;
    }
    90% {
      top: 24px;
    }
    100% {
      top: 25px;
    }
  }
`

export const CircleRelogio = styled.div`
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme['green-700']};
  svg {
    margin-bottom: 2px;
  }
`
export const ContentAlertRelogio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .buttons {
    display: flex;
    align-items: center;
    gap: 10px;

    a {
      cursor: pointer;
    }

    span {
      height: 50%;
      width: 1px;
      background: ${(props) => props.theme['gray-500']};
    }
  }
`
