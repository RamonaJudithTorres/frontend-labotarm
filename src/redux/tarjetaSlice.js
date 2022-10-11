import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState={
    loading:false,
    tarjeta:{},
    error: null,

}


const tarjetaSlice = createSlice({
    name: 'tarjeta',
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
    state.isLogin = action.payload.isLogin;    
    },

    getTarjetas(state, action){
        state.loading = false;
        state.listTarjetas = action.payload.listTarjetas;  
    }
    }
})


export function getAllTarjetas(page_number, page_size){
    return async dispatch => {
    dispatch(tarjetaSlice.actions.startLoading);
    try{
        const response= await axios.get(`http://127.0.0.1:8000/api/servicios/tarjetas?page_number=${page_number}&page_size=${page_size}`);
        const data =response.data;
        
        dispatch(tarjetaSlice.actions.stopLoading);
        dispatch(tarjetaSlice.actions.getTarjetas({
            listTarjetas: data.data
        }));
    } catch(error) {
        console.log(error);
        dispatch(tarjetaSlice.actions.stopLoading);
    }}
}

export default tarjetaSlice.reducer;