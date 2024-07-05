import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import "./styles/main.css";

// Lazy-loaded components
const PersonalInfo = lazy(() => import("./components/PersonalInfo"));
const SelectPlan = lazy(() => import("./components/SelectPlan"));
const AddOns = lazy(() => import("./components/AddOns"));
const Summary = lazy(() => import("./components/Summary"));
const Confirmation = lazy(() => import("./components/Confirmation"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<PersonalInfo />} />
            <Route path="/select-plan" element={<SelectPlan />} />
            <Route path="/add-ons" element={<AddOns />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
