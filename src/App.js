import { Routes, Route, Navigate } from "react-router-dom";
import { Usecontext } from "./Context/Context";
import Account from "./components/Account";
import Users from "./components/Users";
import ForgotPassword from "./components/ForgotPassward";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Userdetail from "./components/Userdetail";



function App() {
  const { isAuthenticated } = Usecontext();

  return (
    <main className="max-w-[120rem] mx-auto bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
       
        <Route path="/account" element={<Account />}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/users" element={<Users />} />
        <Route path="/detail/:memberid" element={<Userdetail />} />
      </Routes>
    </main>
  );
}

export default App;
