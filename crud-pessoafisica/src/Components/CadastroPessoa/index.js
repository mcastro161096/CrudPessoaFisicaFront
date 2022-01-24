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
    const [isVisualizacao, setIsVisualizacao] = useState(false);


    const handleForm = () => {
        setShowForm(!showForm);
        setCurrent(null);
        if(isVisualizacao)
            setIsVisualizacao(false);
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

    const handleVisualizar = (pessoa) => {
        setCurrent(pessoa);
        setIsVisualizacao(true);
        setShowForm(true);
    }

    return (
        <>
         <CreateSnackbar openSnack={openSnack} msgSnack={msg} handleCloseSnack={handleCloseSnack} />
            {showForm && (
                <Form 
                handleForm={handleForm} 
                handleExibirSnack={handleExibirSnack}
                current={current}
                isVisualizacao={isVisualizacao} />
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
            handleEdit={handleEdit}
            handleVisualizar={handleVisualizar} />
            </>
            )}
        </>
    );
}

export default CadastroPessoa;