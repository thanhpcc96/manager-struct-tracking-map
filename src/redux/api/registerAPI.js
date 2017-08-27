import axios from 'axios';
import config from './config';

axios.defaults.baseURL= config.config;

class ResgisterAPI{
    constructor(){
        this.path="client/register";
    }
    async postRegister(clientData){
        try {
            const { data }= await axios.post(this.path,clientData);
            return data;
        } catch (error) {
            return error;
        }
    }
}
export default new ResgisterAPI();