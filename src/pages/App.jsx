import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Home from "./Home.jsx";
import Dashboard from "./DashBoard.jsx";
import DashboardSifilis from "./DashboardSifilis.jsx";
import DashboardTuberculose from "./DashBoardTuberculose.jsx";
import Support from "./Support.jsx";
import EpidemiologicMap from "./EpidemiologyMap.jsx";
import MapDengue from "./maps/MapDengue.jsx";
import MapTubercu from "./maps/MapTubercu.jsx";
import MapSifi from "./maps/MapSifi.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mapa-epidemiologico" element={<EpidemiologicMap />} />
          <Route
            path="/mapa-epidemiologico/endemias/dengue"
            element={<MapDengue />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/sifilis" element={<DashboardSifilis />} />
          <Route
            path="/dashboard/tuberculose"
            element={<DashboardTuberculose />}
          />
          <Route
            path="/mapa-epidemiologico/endemias/tuberculose"
            element={<MapTubercu />}
          />
          <Route
            path="/mapa-epidemiologico/endemias/sifi"
            element={<MapSifi />}
          />
          <Route path="/suporte" element={<Support />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
