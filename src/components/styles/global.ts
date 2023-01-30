import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus{
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
    }

    

    body{
        background-color: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme['gray-300']};
        
    }

    body, input, textarea, button{
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        -webkit-font-smoothing: antialiased;
    }

    ::-webkit-scrollbar {
            width: 12px;               /* width of the entire scrollbar */
        }

        ::-webkit-scrollbar-track {
            background-color: ${(props) =>
        props.theme['gray-600']};;        /* color of the tracking area */
        }

        ::-webkit-scrollbar-thumb {
            background-color: ${(props) => props.theme['green-500']};
            border-radius: 3px; 
        }
`
