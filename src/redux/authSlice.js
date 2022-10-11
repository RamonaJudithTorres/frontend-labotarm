import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

const initialState={
    loading:false,
    currentUser:{},
    error: null,
    isLogin: false,
    isNewUser: false,
}

const setSession = (accessToken, refreshToken)=>{
    if (accessToken && refreshToken){
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        axios.defaults.headers.common.Authorization=`Bearer ${accessToken}`;
    } else{
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common.Authorization;
    }
}

const isValidateToken = accessToken =>{
    if (!accessToken){
        return false;
    }
    const decoded = jwtDecode(accessToken);
    const currentTime= Date.now()/1000;
    return decoded.exp > currentTime;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
    startLoading(state){
        state.loading = true;
    },
    stopLoading(state){
        state.loading = false;
    },
    getInitialState(state,action){
    state.loading = false;
    state.isLogin = action.payload.isLogin    
    },
    loginSucess(state,action){
        state.loading = false;
        state.isLogin=true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.currentUser= action.payload.currentUser;
    },
    logoutUser(state){
        state.isLogin=false;
        state.currentUser=null;
        state.accessToken = null;
        state.refreshToken = null;

    },

    registerSucess(state,action){
        state.loading = false;
        state.isLogin=false;
        state.currentUser= action.payload.currentUser;
        state.isNewUser=true;
    },

    updateSucess(state,action){
        state.loading = false;
        state.currentUser= action.payload.currentUser;
    }

    }
})

export function logoutUser(){

    return async dispatch => {
        dispatch(userSlice.actions.stopLoading());
        dispatch(userSlice.actions.logoutUser());
        setSession(null, null);

    }
}

export function login ({email,password}){
    return async dispatch=>{
        dispatch(userSlice.actions.startLoading);
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/token/',{
                username: email,
                password })
            const {access,refresh} = response.data;
            setSession(access,refresh);
            dispatch(userSlice.actions.stopLoading);
            dispatch(userSlice.actions.loginSucess({
                accessToken:access, 
                refreshToken:refresh}));

        }
        catch(error){
            console.log(error);
            dispatch(userSlice.actions.stopLoading);
        }
    }
}

export function register ({user_email, password, password_confirm, firstName, lastName, user}){
    return async dispatch=>{
        dispatch(userSlice.actions.startLoading);
        try{
            const response = await axios.post('http://127.0.0.1:8000/accounts/register/',{
                email: user_email,
                username: user,
                password,
                password_confirm,
                last_name: lastName,
                first_name: firstName,          
             })
            const {email,username, id} = response.data;
            dispatch(userSlice.actions.stopLoading);
            dispatch(userSlice.actions.registerSucess({
                currentUser:{email,username,id},
            })
                )
        }
        catch(error){
            console.log(error);
            dispatch(userSlice.actions.stopLoading);
        }
    }
}

// UPDATE USER
export function updateUser (dataForm){
    return async dispatch=>{
        dispatch(userSlice.actions.startLoading);
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/users/me',
            dataForm)
            const data = response.data;

            if (data.message !== 'Información actualizada con éxito'){
                throw data
            }
    
            dispatch(userSlice.actions.stopLoading);
            dispatch(userSlice.actions.updateSucess({
                currentUser:data.data,
            }));
             
            toast.success("Perfil actualizado con éxito")
        }
        catch(error){
            console.log(error);
            dispatch(userSlice.actions.stopLoading);
            toast.error("Error al actualizar");
        }
    }
}




// FUNCTION FOR RETURNING USERS PROFILE INFORMATION:

export function getInitialize(){
    return async dispatch =>{  
        const accessToken =window.localStorage.getItem('accessToken');
        const refreshToken =window.localStorage.getItem('refreshToken');

        if (accessToken && isValidateToken(accessToken)){  
           const response = await axios.get('http://127.0.0.1:8000/api/users/me', 
           {contentType: 'application/json',
           headers: {'Authorization': `Bearer ${accessToken}`}
        });
           
        const {id, user, image_profile, phone, gender, points}= response.data.data;
        setSession(accessToken, refreshToken)
        dispatch(userSlice.actions.stopLoading);
        dispatch(userSlice.actions.loginSucess({
        currentUser:{id, user, image_profile, phone, gender, points},
        accessToken,
        refreshToken    
        }))
        }}}

export default userSlice.reducer;


