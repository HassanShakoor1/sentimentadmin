import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import Users from "./pages/Users";
import AddTag from "./pages/AddTag";
import Generate from "./pages/Generate";
import Import from "./pages/Import";

function App() {
  let theToken = localStorage.getItem("sentimentadmin");
  const RequireAuth = ({ children }) => {
    return theToken === "true" ? children : <Navigate to="/Login" />;
  };

  const RequireAuthlogin = ({ children }) => {
    return !theToken ? children : <Navigate to="/home" />;
  };
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
            <Route
              path="/Login"
              element={
                <RequireAuthlogin>
                  <LoginForm />
                </RequireAuthlogin>
              }
            />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/allusers"
              element={
                <RequireAuth>
                  <Users />
                </RequireAuth>
              }
            />
            <Route
              path="/changepass"
              element={
                <RequireAuth>
                  <ChangePassword />
                </RequireAuth>
              }
            />
            <Route
              path="/addTag"
              element={
                <RequireAuth>
                  <AddTag />
                </RequireAuth>
              }
            />
            <Route
              path="/generate"
              element={
                <RequireAuth>
                  <Generate />
                </RequireAuth>
              }
            />
            <Route
              path="/import"
              element={
                <RequireAuth>
                  <Import />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="bottom-left"
          autoClose={1000}
          theme="colored"
          hideProgressBar
        />
      </div>
    </>
  );
}

export default App;
