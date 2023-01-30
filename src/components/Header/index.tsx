import { HeaderContainer } from "./styles";
import logo from "../../assets/logo.svg";
import { Timer, Scroll, Alarm } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Alarm size={24} />
        </NavLink>
        <NavLink to="/stopwatch" title="StopWatch">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
