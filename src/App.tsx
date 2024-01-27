import "./App.css";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// @ts-expect-error TS(6142): Module './Components/Algotrading/Algotrading' was ... Remove this comment to see the full error message
import Algotrading from "./Components/Algotrading/Algotrading";
// @ts-expect-error TS(6142): Module './Components/Sidebar/SideBar' was resolved... Remove this comment to see the full error message
import SideBar from "./Components/Sidebar/SideBar";
// @ts-expect-error TS(6142): Module './Components/Ranking/Ranking' was resolved... Remove this comment to see the full error message
import Ranking from "./Components/Ranking/Ranking";
// @ts-expect-error TS(6142): Module './Components/Executor/ExecutorControlPanel... Remove this comment to see the full error message
import ExecutorControlPanel from "./Components/Executor/ExecutorControlPanel";
// @ts-expect-error TS(6142): Module './Components/Strategy/StrategyDashboard' w... Remove this comment to see the full error message
import StrategyDashboard from "./Components/Strategy/StrategyDashboard";
// @ts-expect-error TS(6142): Module './Components/User/UserDashboard' was resol... Remove this comment to see the full error message
import UserDashboard from "./Components/User/UserDashboard";
// @ts-expect-error TS(6142): Module './Components/Signal/GenerateSignals' was r... Remove this comment to see the full error message
import GenerateSignals from "./Components/Signal/GenerateSignals";
// @ts-expect-error TS(6142): Module './Components/Signal/SignalsDashboard' was ... Remove this comment to see the full error message
import SignalsDashboard from "./Components/Signal/SignalsDashboard";
import NotificationBar from "./Components/NotificationBar/NotificationBar";
import "@emotion/react";

import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

declare module "@emotion/react" {
  export interface Theme {
    color: string;
  }
}

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme()}>
        <div className="flex-row row bg-gray-700 min-h-screen">
          <BrowserRouter>
            <SideBar />
            <NotificationBar />
            <div className="resize-x ml-16 p-1 ">
              <Routes>
                <Route path="/" element={<Algotrading />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/executor_cp" element={<ExecutorControlPanel />} />
                <Route
                  path="/strategy_dashboard"
                  element={<StrategyDashboard />}
                />
                <Route path="/user" element={<UserDashboard />} />
                <Route path="/generate_signals" element={<GenerateSignals />} />
                <Route
                  path="/signals_dashboard"
                  element={<SignalsDashboard />}
                />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
