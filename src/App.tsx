import React from "react";
import HeaderMenu from "./components/web/HeaderMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";
import Footer from "./components/web/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderMenu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post/:postId' element={<ViewPost />} />
          
          <Route path="/login" element={<SignIn />}/>
          <Route path="/register" element={<SignUp />}/>
          
          <Route path="/settings" element={<EditProfile />} />

          <Route path="*" element={<h1>404</h1>} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
