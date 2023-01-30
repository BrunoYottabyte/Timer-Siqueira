import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { History } from "./pages/History";
import { Home } from "./pages/Home";
import StopWatch from "./pages/StopWatch";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/stopwatch" element={<StopWatch />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}
