import { use } from "react";
import React, { useEffect } from 'react';
import {UserContext} from "../context/UserContext"
import {useNavigate} from "react-router-dom"
import axiosInstance from "../utils/axiosInstance.js"
import { API_PATHS } from "../utils/apiPaths.js";

export const useUserAuth = () => {
    const {user,updateUser,clearUser} = React.useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try{
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if(isMounted && response.data){
                    updateUser(response.data)
                }
            } catch (error){
                console.log("Failed to fetch user info ")
                if(isMounted){
                    clearUser();
                    navigate('/login');
                }
            }
        };
        fetchUserInfo();

        return() => {
            isMounted = false;
        };
    }, [updateUser, clearUser, navigate]);
};