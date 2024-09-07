import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Homepage from "./pages/Homepage";
import Photos from "./pages/Photos";
import Videos from "./pages/Videos";
// import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { store } from "./store/store";
import { Provider } from "react-redux";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";
import Error from "./pages/Error";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import OpenRoute from "./components/core/Auth/OpenRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="bg-[#FFFFF0]">
          <Navbar />

          <div className="md:mt-[3.5rem] w-full bg-[#FFFFF0]">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/login"
                element={
                  <OpenRoute>
                    <Login />
                  </OpenRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <OpenRoute>
                    <Signup />
                  </OpenRoute>
                }
              />
              <Route
                path="/verify-email"
                element={
                  <OpenRoute>
                    <VerifyEmail />
                  </OpenRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <OpenRoute>
                    <ForgotPass />
                  </OpenRoute>
                }
              />
              <Route
                path="/reset-pass/:id"
                element={
                  <OpenRoute>
                    <ResetPass />
                  </OpenRoute>
                }
              />
              <Route
                path="/photos"
                element={
                  <PrivateRoute>
                    <Photos />
                  </PrivateRoute>
                }
              />
              <Route
                path="/videos"
                element={
                  <PrivateRoute>
                    <Videos />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
