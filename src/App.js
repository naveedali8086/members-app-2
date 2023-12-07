import { Routes, Route, Navigate } from "react-router-dom";
import { Usecontext } from "./Context/Context";
import Account from "./components/Account";
import ForgotPassword from "./components/ForgotPassward";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import MemberDetail from "./components/MemberDetail";
import Members from "./components/Members";



function App() {
    const { isAuthenticated } = Usecontext();

    return (
        <main className="max-w-[120rem] mx-auto bg-white">
            <Header />
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/account" element={<Account />}/>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/members" element={<Members />} />
                <Route path="/detail/:memberid" element={<MemberDetail />} />
            </Routes>
        </main>
    );
}

export default App;
