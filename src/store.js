import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/authSlice'
import patientReducer from './redux/patientSlice'
import serviceReducer from './redux/serviceSlice'
import tarjetaReducer from './redux/tarjetaSlice'
import estudioReducer from './redux/analisisSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        paciente: patientReducer,
        servicio :serviceReducer,
        tarjeta: tarjetaReducer,
        estudio: estudioReducer,
    }
})

export default store;