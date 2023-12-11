
import { Routes, Route , useLocation } from "react-router-dom";
import { lazy, Suspense , useEffect } from "react";
import Header from "./components/Header";

const LandingPage = lazy(() => import("./components/LandingPage"));
const Account = lazy(() => import("./components/Account"));
const ForgotPassword = lazy(() => import("./components/ForgotPassward"));
const Members = lazy(() => import("./components/Members"));
const MemberDetail = lazy(() => import("./components/MemberDetail"));
const NotFound = lazy(() => import("./components/404"));
const Graphs = lazy(() => import("./components/Graph"))
function App() {
   const {pathname} = useLocation()
   useEffect(()=>{
    document.title = `Insquare remotePT-${pathname}` 
   },[pathname])
  return (
    <main className="max-w-[120rem] mx-auto bg-white">
      <Header />
      
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/members" element={<Members />} />
          <Route path="/detail/:memberid" element={<MemberDetail />} />
          <Route path="/graph/:memberid" element={<Graphs/>} />
          <Route path={`*`} element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;

