import {Link} from "react-router-dom";

export default function Home() {
    return (<div className='min-h-[100vh] flex justify-center items-center px-4 flex-col'>

        <div className='text-xl p-4'>
            This is home for non-logg-in users.
        </div>

        <div style={{'background-color': '#eee', 'color': 'red'}} className='p-4'>
            <Link to='/account'>Login/SignUp</Link>
        </div>

    </div>)
}