import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState={
    loading:false,
    estudio:{},
    error: null,

}


const estudioSlice = createSlice({
    name: 'estudio',
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

    getEstudios(state, action){
        state.loading = false;
        state.listEstudios = action.payload.listEstudios;  
    },
    createAnalisisSucess(state,action){
        state.loading = false;
        state.isLogin=false;
        state.estudio= action.payload.estudio;
    },

    }
})


export function getAllEstudios(page_number, page_size, nombre){
    return async dispatch => {
    dispatch(estudioSlice.actions.startLoading);
    try{
        const response= await axios.get(`http://127.0.0.1:8000/api/servicios/estudios/all?page_number=${page_number}&page_size=${page_size}&nombre=${nombre}`);
        const data =response.data;
        
        dispatch(estudioSlice.actions.stopLoading);
        dispatch(estudioSlice.actions.getEstudios({
            listEstudios: data.data
           
        }));
    } catch(error) {
        console.log(error);
        dispatch(estudioSlice.actions.stopLoading);
    }}
}



// CREAR NUEVO ESTUDIO
export function createEstudio ({nombre, clave, descripcion}){
    return async dispatch=>{
        dispatch(estudioSlice.actions.startLoading);
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/servicios/estudios/create/',{
                nombre,
                clave,
                descripcion,     
             })
            dispatch(estudioSlice.actions.stopLoading);
            dispatch(estudioSlice.actions.createAnalisisSucess({
                estudio:{nombre, clave, descripcion}
            })
                )
        }
        catch(error){
            console.log(error);
            dispatch(estudioSlice.actions.stopLoading);
        }
    }
}


export default estudioSlice.reducer;


