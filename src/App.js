import "./App.css";
import { Navbar, Footer } from "./components";
import React from "react";
import { Home, Profile, Item, Create, Login, Explorer, Admin } from "./pages";
import { Routes, Route } from "react-router-dom";
import Collection from "./pages/collection/Collection";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Error404 from "./pages/error404/error404";
import { Navigate } from "react-router";
function App() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/item/:addressItem" element={<Item />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <Create />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:userAddress"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/collection/:collectionId"
            element={
              <PrivateRoute>
                <Collection />
              </PrivateRoute>
            }
          />

          <Route
            path="/explorer"
            element={
              // <PrivateRoute>
              <Explorer />
              // </PrivateRoute>
            }
          />
          <Route path="/error-404" element={<Error404 />} />

          <Route path="*" element={<Navigate to="/error-404" />} />
        </Routes>
      </div>
      <div className="footerApp">
        <Footer />
      </div>
    </div>
  );
}

export default App;
