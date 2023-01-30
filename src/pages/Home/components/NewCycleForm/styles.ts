import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 630px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
  @media (max-width: 768px){
    max-width: 85vw;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }
`
export const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: inherit;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }

  @media (max-width: 768px){
    width: 70%;
    text-align: center;
  }
`
export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
  @media (max-width: 768px){
    width: 70%;
    text-align: center;
  }
`
