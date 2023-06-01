import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Logout = () => {

  const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            try {
                // //window.location.href = '/login'
                // const {data} = await axios.post('http://localhost:8002/logout/',{
                //     refresh_token:localStorage.getItem('refresh_token')
                // } ,{headers: {
                //     'Content-Type': 'application/json',
                //     'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                // }}, {withCredentials: true});

                //console.log('logout', data)
                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                //put href at top so it wont show error
                navigate('/login');
            } catch (e) {
                console.log('logout not working')
            }
        })();
    }, []);


        

    return (
        <div></div>
    )
}