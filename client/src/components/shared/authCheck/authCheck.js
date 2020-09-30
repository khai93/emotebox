import React, { useState, useEffect } from 'react'
import { AuthHelper } from '../../../helpers'

function AuthCheck(props) {
    const NextComponent = props.component;

    const [user, setUser] = useState({})

    if (typeof NextComponent == 'undefined') {
        throw new Error("Please provide a component to transition to!")
    }

    useEffect(() => {
        async function fetchData() {
            const userRes = await AuthHelper.getAuthenticatedUser();
            setUser(userRes);
        }

        // TODO: HANDLE THROWN ERROR IF IT COULD NOT GET THE USER
        fetchData()
    }, [])

    return (
        <NextComponent user={user}/>
    );
}

export default AuthCheck