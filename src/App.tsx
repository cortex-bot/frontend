import "./App.css";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Algotrading from "./Components/Algotrading/Algotrading";
import SideBar  from "./Components/Sidebar/SideBar";
import Ranking from "./Components/Ranking/Ranking";
import ExecutorControlPanel from "./Components/Executor/ExecutorControlPanel";
import StrategyDashboard from "./Components/Strategy/StrategyDashboard";
import UserDashboard from "./Components/User/UserDashboard";
import GenerateSignals from "./Components/Signal/GenerateSignals";
import SignalsDashboard from "./Components/Signal/SignalsDashboard";
export default function App() {

    return (
      <div className="flex-row row bg-gray-700 min-h-screen">
        <BrowserRouter>
          <SideBar />
          <div className="resize-x ml-16 p-1 ">
            <Routes>
              <Route path="/" element={<Algotrading />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/executor_cp" element={<ExecutorControlPanel />} />
              <Route path="/strategy_dashboard" element={<StrategyDashboard />} />
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/generate_signals" element={<GenerateSignals />} />
              <Route path="/signals_dashboard" element={<SignalsDashboard />} />
  
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  
}
