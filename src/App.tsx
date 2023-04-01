import React from "react";
import HeaderMenu from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderMenu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:postId' element={<ViewPost />} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
