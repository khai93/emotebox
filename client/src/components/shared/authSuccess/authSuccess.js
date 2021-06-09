import React, { useState, useEffect } from 'react';

export function AuthSuccess(props) {
    useEffect(() => {
        const url = '/';
        
        window.opener.open(url, '_self');
        window.opener.focus();
        window.close();
    }, []);

    return (
        <div>
            SUCCESS
        </div>
    )
}
