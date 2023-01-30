import styled from 'styled-components'

export const StopWatchContainer = styled.main`
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

export const StopWatchContent = styled.div`
  display: flex;
  justify-content: center;

  position: relative;
  align-items: center;
  svg {
    position: absolute;
    transform: translateX(5px);
  }

  height: 350px;
  width: 350px;
  border-radius: 50%;

  background-color: ${(props) => props.theme['gray-700']};
  outline: 3px solid ${(props) => props.theme['gray-600']};
  outline-offset: 5px;

  margin: 3rem 0;

  font-family: 'Roboto Mono', monospace;
  font-size: 2.5rem;
  color: ${(props) => props.theme['gray-100']};
  span {
    padding: 2rem 0.3rem;
    border-radius: 8px;
  }
`

export const ControlStopWatch = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
`

export const BaseStopWatchButton = styled.button`
  max-width: 400px;
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

export const CanceledButton = styled(BaseStopWatchButton)`
  &.active {
    background-color: ${(props) => props.theme['red-500']};
  }
`

export const StopButton = styled(BaseStopWatchButton)``
