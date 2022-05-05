import "./App.css";
import { Navbar, Footer } from "./components";
import { Home, Profile, Item, Create, Login, Explorer } from "./pages";
import { Routes, Route } from "react-router-dom";
import Collection from "./pages/collection/Collection";
import PrivateRoute from "./components/private-route/PrivateRoute";
function App() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
