import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/styles/global.js";
import { defaultTheme } from "./components/styles/themes/default.js";
import { Router } from "./Router.js";
import { BrowserRouter } from "react-router-dom";
import { CyclesContextProvider } from "./contexts/CyclesContext.js";

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
}
