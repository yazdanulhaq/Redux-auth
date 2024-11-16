import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleGoogleUser } from '../actions/authActions'

const GoogleSignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleCredentialResponse = (response) => {
            const userObject = parseJwt(response.credential);
            if (userObject) {
                const user = {
                    "firstName": userObject.given_name,
                    "lastName": userObject.family_name,
                    "username": userObject.name,
                    "email": userObject.email,
                    "image": userObject.picture,
                    "sub": userObject.sub,
                    "gender": '',
                    "isSocialSignIn": true
                }
                dispatch(handleGoogleUser(user))
                navigate('/Profile');
            }
        };

        const prodGoogleClientID = "291880767153-fmpkjena48d2fv4011p9vess6i14kc77.apps.googleusercontent.com"
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: prodGoogleClientID,
                callback: handleCredentialResponse,
                auto_select: false
            });

            window.google.accounts.id.renderButton(
                document.getElementById('buttonDiv'),
                { theme: 'outline', size: 'large' }
            );
            window.google.accounts.id.prompt();
        }

    }, [navigate]);

    // Helper function to decode the JWT token
    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        return JSON.parse(jsonPayload);
    };

    return (
        <div id="buttonDiv"></div>
    );
};

export default GoogleSignIn;