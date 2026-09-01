import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Home from "./Home.jsx";
import Dashboard from "./DashBoard.jsx";
import EpidemiologicMap from "./EpidemiologyMap.jsx";
import MapDengue from "./maps/MapDengue.jsx";
import Support from "./Support.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dados-gerais" element={<Dashboard />} />
          <Route path="/mapa-epidemiologico" element={<EpidemiologicMap />} />
          <Route
            path="/mapa-epidemiologico/endemias/dengue"
            element={<MapDengue />}
          />
          <Route path="/suporte" element={<Support />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
