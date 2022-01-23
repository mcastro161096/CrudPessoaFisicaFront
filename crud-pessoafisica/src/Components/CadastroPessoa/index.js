import React, { useState } from "react";
import Button from '@mui/material/Button';

import Form from "./Form/Form";
import List from "./List/List"

function CadastroPessoa() {
    const [showForm, setShowForm] = useState(false);

    const handleForm = () => {
        setShowForm(!showForm);
    }

    return (
        <>
            {showForm && (
                <Form handleForm={handleForm} />
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

            <List />
            </>
            )}
        </>
    );
}

export default CadastroPessoa;