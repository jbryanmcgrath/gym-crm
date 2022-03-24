import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { MUTATION_MEMBERCOUNT } from '../utils/mutations';

const MemberCount = () =>  {
    let [countMember, setCount] = useState();
    const [memberCount, { error }] = useMutation(MUTATION_MEMBERCOUNT);
    let memberArrived = () => {
        // increases members at gym by 1
        setCount((countMember += 1));
    };

    let memberLeft = () => {
        if (countMember === 0) {
            alert("There are no members at your gym at this time.")
        } else {
            setCount((countMember -= 1));
        }
    };
    const handleFormSubmit = async (event) => {
        event.preventdefault();
        try {
            await memberCount ({ variables: { countMember }})
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <div>
        <h1>Members currently at your gym: {countMember} </h1>
        <p>If a member arrives at your gym, select Check-In to keep your count. If a member leaves your gym, select Check-out to keep your count</p>
        <form onSubmit={handleFormSubmit} >
        <input name="email" type="email" placeholder='Email'></input>
        <button type="submit" onClick={memberArrived}>Check-In</button>
        <button type="submit" onClick={memberLeft}>Check-Out</button>
        </form>


        
        </div>
    )
}

export default MemberCount