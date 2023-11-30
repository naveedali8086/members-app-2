import Account from "./components/Account";
import Users from "./components/Users";
import {Route , Routes} from "react-router-dom"
function App() {
    return (
        <main className="max-w-[120rem] mx-auto bg-white ">
            <Routes>
                <Route path='/' element={ <Account/>}/>
                <Route path='/users' element={<Users/>}/>
            </Routes>
        </main>
    );
}

export default App;
