import React, { useState } from "react";
import Button from '@mui/material/Button';

import Form from "./Form/Form";
import List from "./List/List"
import CreateSnackbar from '../CreateSnackbar/';

function CadastroPessoa() {
    const [showForm, setShowForm] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const [current, setCurrent] = useState(null);


    const handleForm = () => {
        setShowForm(!showForm);
        setCurrent(null);
    }

    const handleCloseSnack = () => {
        setOpenSnack(!openSnack);
    }

    const handleExibirSnack = (msg) => {
        setMsg(msg);
        setOpenSnack(true);
    }

    const handleEdit = (pessoa) => {
        setCurrent(pessoa);
        setShowForm(true);
    }

    return (
        <>
         <CreateSnackbar openSnack={openSnack} msgSnack={msg} handleCloseSnack={handleCloseSnack} />
            {showForm && (
                <Form 
                handleForm={handleForm} 
                handleExibirSnack={handleExibirSnack}
                current={current} />
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
            handleEdit={handleEdit} />
            </>
            )}
        </>
    );
}

export default CadastroPessoa;