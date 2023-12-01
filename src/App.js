import Account from "./components/Account";
import Users from "./components/Users";
import ForgotPassword from "./components/ForgotPassward";
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom"

function App() {
    return (
        <main className="max-w-[120rem] mx-auto bg-white ">
            <Header/>
            <Routes>
                <Route path='/' element={<Account/>}/>
                <Route path='/forgot-password' element={<ForgotPassword/>}/>
                <Route path='/users' element={<Users/>}/>
            </Routes>
        </main>
    );
}

export default App;
