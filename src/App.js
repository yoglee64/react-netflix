import React from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path=":movieId" element={<DetailPage />} />
        </Route>
      </Routes>
    </div>
  )
}
export default App;
