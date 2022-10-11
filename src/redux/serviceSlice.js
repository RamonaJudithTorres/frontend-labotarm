import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState={
    loading:false,
    servicio:{},
    error: null,

}


const serviceSlice = createSlice({
    name: 'servicio',
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

    getServices(state, action){
        state.loading = false;
        state.listService = action.payload.listService;  
    }
    }
})


export function getAllServices(page_number, page_size){
    return async dispatch => {
    dispatch(serviceSlice.actions.startLoading);
    try{
        const response= await axios.get(`http://127.0.0.1:8000/api/servicios/all?page_number=${page_number}&page_size=${page_size}`);
        const data =response.data;
        
        dispatch(serviceSlice.actions.stopLoading);
        dispatch(serviceSlice.actions.getServices({
            listService: data.data
           
        }));
    } catch(error) {
        console.log(error);
        dispatch(serviceSlice.actions.stopLoading);
    }}
}

export default serviceSlice.reducer;


