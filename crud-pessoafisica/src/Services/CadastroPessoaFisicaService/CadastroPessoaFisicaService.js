import axios from "axios";
import { urlApi } from "../../Components/Api/Api";
const URL = urlApi + "PessoaFisica";

export async function getAll() {
    try {
        let response = await axios.get(URL);
        return response;
    } catch (error) {
        return error;
    }
}

export async function post(payload) {
    try {
        let response = await axios.post(URL, payload);
        return response;
    } catch (error) {
        return error;
    }
}

export async function deleteOn(id) {
    try {
        let response = await axios.delete(URL + `/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}