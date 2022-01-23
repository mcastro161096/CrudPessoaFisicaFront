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