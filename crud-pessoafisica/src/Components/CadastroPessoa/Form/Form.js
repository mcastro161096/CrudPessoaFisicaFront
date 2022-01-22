import React from "react";
import Button from '@mui/material/Button';
import { TextField, Typography, Container, Skeleton } from '@mui/material';

function Form() {
    return (
        <>
            <form>
                <TextField fullWidth label="Nome Completo" variant="outlined" />
                <TextField fullWidth label="CPF" variant="outlined" />
                <TextField fullWidth label="Valor da renda" variant="outlined" />
                
                <Button type="submit" variant="outlined"> Cancelar</Button>
                <Button type="submit" variant="contained"> Salvar</Button>
            </form>
        </>
                );
}

                export default Form;