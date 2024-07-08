import "./App.css";
import React, { useState } from "react";
import WorldMap from "./Pages/WorldMap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Pages/NavBar";
import { CovidContext } from "./Context/CovidContext";
import LoadingPage from "./Components/LoadingPage";


const AboutUs = React.lazy(() => import("./Pages/AboutUs"));
const DashboardPage = React.lazy(() => import("./Pages/DashboardPage"));
const Visualisation = React.lazy(() => import("./Pages/Visualisations"));
const Help = React.lazy(() => import("./Pages/Help"));
const HomePage = React.lazy(() => import("./Pages/HomePage"));

function App() {
  const [searchedCountry, setSearchedCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});
  const [hoveredCountry, setHoveredCountry] = useState({});
  const [covidTimelineData, setCovidTimelineData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("20200101");
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div>
        <NavBar />
        <CovidContext.Provider
          value={{
            setSearchedCountry,
            searchedCountry,
            selectedCountry,
            setSelectedCountry,
            hoveredCountry,
            setHoveredCountry,
            covidTimelineData,
            setCovidTimelineData,
            selectedDate,
            setSelectedDate,
            loading,
            setLoading,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <React.Suspense fallback={<LoadingPage />}>
                  <HomePage />
                </React.Suspense>
              }
            />
            <Route
              path="/visualisations"
              element={
                <React.Suspense fallback={<LoadingPage />}>
                  <Visualisation />
                </React.Suspense>
              }
            />
            <Route
              path="/dashboard"
              element={
                <React.Suspense fallback={<LoadingPage />}>
                  <DashboardPage />
                </React.Suspense>
              }
            />
            <Route
              path="/help"
              element={
                <React.Suspense fallback={<LoadingPage />}>
                  <Help />
                </React.Suspense>
              }
            />
            <Route
              path="/aboutus"
              element={
                <React.Suspense fallback={<LoadingPage />}>
                  <AboutUs />
                </React.Suspense>
              }
            />
          </Routes>
        </CovidContext.Provider>
      </div>
    </Router>
  );
}
export default App;
