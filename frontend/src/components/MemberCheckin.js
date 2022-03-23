import React, { useState } from 'react'

const MemberCount = () =>  {
    let [countMember, setCount] = useState(0);
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

    return (
        <div>
        <h1>Members currently at your gym: {countMember} </h1>
        <p>If a member arrives at your gym, select Check-In to keep your count. If a member leaves your gym, select Check-out to keep your count</p>
        <button onClick={memberArrived}>Check-In</button>
        <button onClick={memberLeft}>Check-Out</button>


        
        </div>
    )
}

export default MemberCount