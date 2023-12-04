import React from 'react'
import { Usecontext } from "../Context/Context";
import { async } from 'q';

const Users = () => {
    const {getSession} = Usecontext()
     const handleClick = () =>{
         getSession().then(({token})=> console.log(token));
        //  console.log(id);
     }

    return (
        <div className="font-bold text-2xl">
            Users
            <button onClick={handleClick}>click</button>
        </div>
    )
}

export default Users
