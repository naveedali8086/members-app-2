import Account from "./components/Account";
import Users from "./components/Users";
import ForgetPassword from "./components/ForgetPass";
import Header from "./components/Header";
import {Route , Routes} from "react-router-dom"
function App() {
    return (
        <main className="max-w-[120rem] mx-auto bg-white ">
            <Header/>
            <Routes>
                <Route path='/' element={ <Account/>}/>
                <Route path='/forgetpass' element={<ForgetPassword/>}/>
                <Route path='/users' element={<Users/>}/>
            </Routes>
        </main>
    );
}

export default App;
