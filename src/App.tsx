import "./App.css";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// @ts-expect-error TS(6142): Module './Components/Algotrading/Algotrading' was ... Remove this comment to see the full error message
import Algotrading from "./Components/Algotrading/Algotrading";
// @ts-expect-error TS(6142): Module './Components/Sidebar/SideBar' was resolved... Remove this comment to see the full error message
import SideBar  from "./Components/Sidebar/SideBar";
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
export default function App() {

    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="flex-row row bg-gray-700 min-h-screen">
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <BrowserRouter>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <SideBar />
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="resize-x ml-16 p-1 ">
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Routes>
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Route path="/" element={<Algotrading />} />
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Route path="/ranking" element={<Ranking />} />
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Route path="/executor_cp" element={<ExecutorControlPanel />} />
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Route path="/strategy_dashboard" element={<StrategyDashboard />} />
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Route path="/user" element={<UserDashboard />} />
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Route path="/generate_signals" element={<GenerateSignals />} />
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Route path="/signals_dashboard" element={<SignalsDashboard />} />
  
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  
}
