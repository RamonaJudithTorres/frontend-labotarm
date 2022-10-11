import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState={
    loading:false,
    paciente:{},
    error: null,

}


const patientSlice = createSlice({
    name: 'paciente',
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

    getPatients(state, action){
        state.loading = false;
        state.listPatient = action.payload.listPatient;  
    },

    createPatientSucess(state,action){
        state.loading = false;
        state.isLogin=false;
        state.paciente= action.payload.paciente;
    },


    }
})


export function getAllPatients(page_number, page_size){
    return async dispatch => {
    dispatch(patientSlice.actions.startLoading);
    try{
        const response= await axios.get(`http://127.0.0.1:8000/api/servicios/pacientes/all?page_number=${page_number}&page_size=${page_size}`);
        const data =response.data;
        
        dispatch(patientSlice.actions.stopLoading);
        dispatch(patientSlice.actions.getPatients({
            listPatient: data.data
           
        }));
    } catch(error) {
        console.log(error);
        dispatch(patientSlice.actions.stopLoading);
    }}
}


// CREAR NUEVO PACIENTE
export function createPatient ({nombre, edad, telefono}){
    return async dispatch=>{
        dispatch(patientSlice.actions.startLoading);
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/servicios/pacientes/create/',{
                nombre,
                edad,
                telefono,     
             })
            dispatch(patientSlice.actions.stopLoading);
            dispatch(patientSlice.actions.createPatientSucess({
                paciente:{nombre,edad, telefono}
            })
                )
        }
        catch(error){
            console.log(error);
            dispatch(patientSlice.actions.stopLoading);
        }
    }
}


export default patientSlice.reducer;

