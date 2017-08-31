import { POSTREGISTER } from '../types';

import RegisterAPI from '../api/registerAPI';


export function postRegisterAction(clientData){
    return async (dispatch)=>{
        dispatch({
            type: POSTREGISTER,
            clientData
        });
        try {
            const dada= await RegisterAPI.postRegister(clientData);
        } catch (error) {
            
        }
    }
}