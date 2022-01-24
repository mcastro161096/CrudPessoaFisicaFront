import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEdit from '@mui/icons-material/ModeEdit';
import PersonSearch from '@mui/icons-material/PersonSearch';

import { getAll, deleteOne, getOne } from '../../../Services/CadastroPessoaFisicaService/CadastroPessoaFisicaService';
import { formataData, formataMoeda } from '../../Common/FormataCampos/FormataCampos';
import { statusError, ERRO_CARREGARLISTA, ERRO_EXCLUIR, SUCESSO_EXCLUIR } from '../../Common/Constantes/Constantes';
import Modal from '../../Modal/';
import Loading from '../../Loading';

export default function List({ handleExibirSnack, handleEdit, handleVisualizar}) {
    const [listaPessoas, setListaPessoas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);

    const columns = [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'nomeCompleto', headerName: 'Nome Completo', width: 300 },
        { field: 'cpf', headerName: 'CPF', width: 200 },
        { field: 'valorRenda', headerName: 'Valor Renda', width: 130 },
        { field: 'dataNascimento', headerName: 'Data nascimento', width: 160 },
        {
            field: "Visualizar",
            sortable: false,
            renderCell: (cellValues) => {
                return (
                    <IconButton
                        aria-label="visualizar"
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                            handleVisualizarPrepare(cellValues);
                        }}>
                        <PersonSearch />
                    </IconButton>
                );
            }
        },
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
                            handleEditPrepare(cellValues);
                        }}>
                        <ModeEdit />
                    </IconButton>
                );
            }
        },
    ];

    const fillList = async () => {
        setLoading(true);
        let response = await getAll();

        if (response) {
            if (response.response && statusError.includes(response.response.status)) {
                handleExibirSnack(ERRO_CARREGARLISTA);
            }
            else {

                if (response.data) {
                    let lista = response.data.map((item) => {
                        item.dataNascimento = formataData(item.dataNascimento);
                        item.valorRenda = formataMoeda(item.valorRenda);
                        return item;
                    })

                    setListaPessoas((lista));
                }
            }
        }
        else {
            handleExibirSnack(ERRO_CARREGARLISTA);
        }
        setLoading(false)
    }

    const handleDelete = async (values) => {
        setDeleteId(values.row.id);
        handleModal();
    }

    const handleModal = () => {
        setModalOpen(!modalOpen);
    }

    const handleAcceptModal = async () => {
        setLoading(true);
        let response = await deleteOne(deleteId);
        if (response) {
            if (response.response && statusError.includes(response.response.status)) {
                handleExibirSnack(ERRO_EXCLUIR);
            }
            else {

                if (response) {
                    handleExibirSnack(SUCESSO_EXCLUIR);
                    fillList();
                }
            }
        }
        else {
            handleExibirSnack(ERRO_EXCLUIR)
        }
        handleModal();
        setDeleteId(null);
        setLoading(false);
    }

    const handleCloseModal = () => {
        setDeleteId(null);
    }

    const handleEditPrepare = async (values) => {
        let response = await getOne(values.row.id);
        let pessoa = response.data;
        handleEdit(pessoa);
    }

    const handleVisualizarPrepare = async (values) => {
        let response = await getOne(values.row.id);
        let pessoa = response.data;
        handleVisualizar(pessoa);
    }

    useEffect(() => {
        fillList();
    }, []);


    return (
        <>
            {loading && (
                <Loading />)}
        <Modal 
        openModal={modalOpen} 
        handleModal={handleModal} 
        handleAcceptModal={handleAcceptModal}
        handleCloseModal={handleCloseModal} />
            <div style={{ height: "100vh", width: '100%' }}>
                <DataGrid
                    rows={listaPessoas}
                    columns={columns}
                    rowsPerPageOptions={[5]}
                    hideFooter
                />
            </div>
        </>
    );
}
