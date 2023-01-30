import styled from 'styled-components'

export const CountdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  svg {
    position: absolute;
    transform: translateX(5px);
  }
  height: 300px;
`

export const CountdownClock = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 2.5rem;
  color: ${(props) => props.theme['gray-100']};
  display: flex;
  gap: 0.5rem;
  z-index: 1;
  span {
    padding: 2rem 0rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']}

  width: 2rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`
export const CircleShadowProgressBar = styled.circle`
  transform: rotate(-90deg) translateY(-5px);
  transform-origin: center;
  stroke-width: 1px;
  stroke: #ccc;
  fill: transparent;
  cx: 220;
  cy: 225;
  r: 170;
  @media (max-width: 768px) {
    r: 140;
  }
`

export const CircleProgressBar = styled.circle`
  cx: 220;
  cy: 225;
  transform: rotate(-90deg) translateY(-5px);
  transform-origin: center;
  stroke-width: 6px;
  stroke: ${(props) =>
    props.currentSeconds <= 5 && props.activeCycle
      ? props.theme['red-500']
      : props.theme['green-500']};
  transition: all 1s;
  fill: transparent;
  z-index: 0;
  r: 170;
  @media (max-width: 768px) {
    r: 140;
  }
`
