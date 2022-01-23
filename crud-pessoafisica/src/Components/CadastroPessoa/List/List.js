import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEdit from '@mui/icons-material/ModeEdit';

import { getAll } from '../../../Services/CadastroPessoaFisicaService/CadastroPessoaFisicaService';
import { formataData, formataMoeda } from '../../Common/FormataCampos/FormataCampos';
import { statusError, ERRO_CARREGARLISTA } from '../../Common/Constantes/Constantes';
import CreateSnackbar from '../../CreateSnackbar/';

export default function List() {
    const [listapessoas, setListapessoas] = useState([]);
    const [openSnack, setOpenSnack] = useState(false);
    const [msg, setMsg] = useState("");


    const columns = [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'nomeCompleto', headerName: 'Nome Completo', width: 400 },
        { field: 'cpf', headerName: 'CPF', width: 200 },
        { field: 'valorRenda', headerName: 'Valor Renda', width: 130 },
        { field: 'dataNascimento', headerName: 'Data nascimento', width: 160 },
        {
            field: "Excluir",
            sortable: false,
            renderCell: (cellValues) => {
                return (
                    <IconButton
                        aria-label="delete"
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                            handleDelete(cellValues);
                        }}>
                        <DeleteIcon />
                    </IconButton>
                );
            }
        },
        {
            field: "Editar",
            sortable: false,
            renderCell: (cellValues) => {
                return (
                    <IconButton
                        aria-label="edit"
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                            alert(cellValues);
                        }}>
                        <ModeEdit />
                    </IconButton>
                );
            }
        },
    ];

    const fillList = async () => {
        let response = await getAll();

        if (response) {
            if (response.response && statusError.includes(response.response.status)) {
                setMsg(ERRO_CARREGARLISTA);
                setOpenSnack(true);
            }
            else {

                if (response.data) {
                    let lista = response.data.map((item) => {
                        item.dataNascimento = formataData(item.dataNascimento);
                        item.valorRenda = formataMoeda(item.valorRenda);
                        return item;
                    })

                    setListapessoas((lista));
                }
            }
        }
        else {
            setMsg(ERRO_CARREGARLISTA);
            setOpenSnack(true);
        }
    }

    const handleDelete = (values) => {
        console.log(values);
    }

    const handleCloseSnack = () => {
        setOpenSnack(!openSnack);
    }


    useEffect(() => {
        fillList();
    }, []);


    return (
        <>
            <CreateSnackbar openSnack={openSnack} msgSnack={msg} handleCloseSnack={handleCloseSnack} />
            <div style={{ height: "100vh", width: '100%' }}>
                <DataGrid
                    rows={listapessoas}
                    columns={columns}
                    rowsPerPageOptions={[5]}
                    hideFooter
                />
            </div>
        </>
    );
}
