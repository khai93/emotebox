import React, { useState, useEffect } from 'react';

import './app.css'

function App() { 
    const [user, setUser] = useState({});

    const getAuthenticatedUser = () => {
        fetch("/api/auth/user")
            .then(res => {
                if (res.status == 401) {
                    return window.location = "/login";
                }

                return res.json()
            })
            .then((user) => {
                setUser(user);
            },
            (error) => {
                console.error(error);
            })
    } 

    useEffect(() => {
        getAuthenticatedUser();
    })

    return (
        <div>
            <h2>Hello {user.username}!</h2>
        </div>
    )
}

export default App;