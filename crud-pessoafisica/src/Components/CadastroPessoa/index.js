import React, { useState } from "react";
import Button from '@mui/material/Button';

import Form from "./Form/Form";
import List from "./List/List"
import { statusError, ERRO_CARREGARLISTA } from '../Common/Constantes/Constantes';
import CreateSnackbar from '../CreateSnackbar/';

function CadastroPessoa() {
    const [showForm, setShowForm] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [msg, setMsg] = useState("");


    const handleForm = () => {
        setShowForm(!showForm);
    }

    const handleCloseSnack = () => {
        setOpenSnack(!openSnack);
    }

    const handleExibirSnack = (msg) => {
        setMsg(msg);
        setOpenSnack(true);
    }


    return (
        <>
         <CreateSnackbar openSnack={openSnack} msgSnack={msg} handleCloseSnack={handleCloseSnack} />
            {showForm && (
                <Form 
                handleForm={handleForm} 
                handleExibirSnack={handleExibirSnack} 
                handleCloseSnack={handleCloseSnack} />
            )}

            {!showForm && (
                <>
            <Button 
            style={{display: "flex"}}
            size="large"
            
            variant="contained" 
            onClick={handleForm}
            >
            Cadastrar
            </Button>

            <List 
            handleExibirSnack={handleExibirSnack} 
            handleCloseSnack={handleCloseSnack} />
            </>
            )}
        </>
    );
}

export default CadastroPessoa;