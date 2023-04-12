import React from "react";
import HeaderMenu from "./components/web/HeaderMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewArticle from "./pages/ViewArticle";
import Footer from "./components/web/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditProfile from "./pages/EditProfile";
import { AuthRoutes, GuestRoutes } from "./middleWare/auth";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import NewArticle from "./pages/NewArticle";
import { Box } from "@mantine/core";
function App() {
  const minHeight = `calc(100vh - 120px)`;
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderMenu />
        <Box mih={minHeight}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:postId" element={<ViewArticle />} />

            <Route element={<GuestRoutes />}>
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
            </Route>

            <Route element={<AuthRoutes />}>
              <Route path="/settings" element={<EditProfile />} />
              <Route path="/newArticle" element={<NewArticle/>} />
            </Route>

            <Route path="/profile/:username" element={ <Profile /> } />

            <Route path="*" element={ <NotFoundPage /> } />
          </Routes>
        </Box>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
