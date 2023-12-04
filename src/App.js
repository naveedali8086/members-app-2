import { Routes, Route, Navigate } from "react-router-dom";
import { Usecontext } from "./Context/Context";
import Account from "./components/Account";
import Users from "./components/Users";
import ForgotPassword from "./components/ForgotPassward";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
export function NonAuthenticatedRoutes() {
  return (
    <Routes>
      <Route index element={<Account />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

function App() {
  const { isAuthenticated } = Usecontext();

  return (
    <main className="max-w-[120rem] mx-auto bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/users" element={
            isAuthenticated ? <Users /> : <Navigate to="/account" />
        } />
        <Route
          path="/account/*"
          element={
            isAuthenticated ? <Navigate to="/users" /> : <NonAuthenticatedRoutes />
          }
        />
      </Routes>
    </main>
  );
}

export default App;
