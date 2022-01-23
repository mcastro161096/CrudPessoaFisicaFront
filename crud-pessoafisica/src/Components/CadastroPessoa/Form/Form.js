import React, { useState } from "react";
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import brLocale from 'date-fns/locale/pt-BR';
import { withStyles } from '@material-ui/styles';

import { post } from "../../../Services/CadastroPessoaFisicaService/CadastroPessoaFisicaService";
import { statusError, ERRO_SALVAR, SUCESSO_SALVAR } from '../../Common/Constantes/Constantes';
import { formataMoedaAoDigitar } from '../../Common/FormataCampos/FormataCampos';


const styles = {
    root: {
        zIndex: 9999,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: "#F9F0F0",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.23,
    },
};

const initialValues = {
    nomeCompleto: "",
    cpf: "",
    valorRenda: "",
    dataNascimento: new Date(),
}

const localeMap = {
    br: brLocale,
};

function Form({ classes, handleForm, handleExibirSnack, handleCloseSnack }) {
    const [data, setData] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const [inputValid, setInputValid] = useState({
        nomeCompleto: { valido: true, msg: "" },
        cpf: { valido: true, msg: "" },
        valorRenda: { valido: true, msg: "" },
        dataNascimento: { valido: true, msg: "" }
    });

    const locale = 'br';
    const msgCampoObrigatorio = "Campo obrigatório";




    const handleChange = (event) => {
        event.persist();

        setData((values => ({
            ...values,
            [event.target.name]: event.target.value,
        })));

        setInputValid((values => ({
            ...values,
            [event.target.name]: { valido: true, msg: "" }
        })));
    };

    const handleChangeRenda = (event) => {
        event.persist();

        let rendaDigitada = event.target.value.replace("%", "");
        rendaDigitada = rendaDigitada.replace(/[^\d\.]+/g, '');
        rendaDigitada = formataMoedaAoDigitar(rendaDigitada);

        setData(values => ({
          ...values,
          valorRenda: rendaDigitada,
        }));

        setInputValid((values => ({
            ...values,
            valorRenda: { valido: true, msg: "" }
        })));
    
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validarCampos()) {
            setLoading(true);
            
           let response = await post(data);
           if (response) {
            if (response.response && statusError.includes(response.response.status)) {
                handleExibirSnack(ERRO_SALVAR);
            }
            else {

                if (response) {
                    handleExibirSnack(SUCESSO_SALVAR);
                    handleForm();
                }
            }
        }
        else {
            handleExibirSnack(ERRO_SALVAR)
        }
        }

        setLoading(false);
        return;
    }

    const validarCampos = () => {
        if (data.nomeCompleto === "") {
            setInputValid((values => ({
                ...values,
                nomeCompleto: { valido: false, msg: msgCampoObrigatorio }
            })));
            return false;
        }

        if (data.cpf === "") {
            setInputValid((values => ({
                ...values,
                cpf: { valido: false, msg: msgCampoObrigatorio }
            })));
            return false;
        }

        if (data.valorRenda === "") {
            setInputValid((values => ({
                ...values,
                valorRenda: { valido: false, msg: msgCampoObrigatorio }
            })));
            return false;
        }


        if (inputValid.nomeCompleto.valido && inputValid.cpf.valido && inputValid.valorRenda.valido) {
            return true;
        }
        else
            return false;
    }

    return (
        <>
            {loading && (
                <Box className={classes.root} sx={{ display: 'flex', }}>
                    <CircularProgress size={100} />
                </Box>)}

            <form onSubmit={handleSubmit}>
                <TextField
                    name="nomeCompleto"
                    value={data.nomeCompleto}
                    fullWidth
                    margin="normal"
                    label="Nome Completo"
                    variant="outlined"
                    onChange={(e) => handleChange(e)}
                    error={!inputValid.nomeCompleto.valido}
                    helperText={inputValid.nomeCompleto.msg}
                />

                <TextField
                    name="cpf"
                    value={data.cpf}
                    fullWidth
                    margin="normal"
                    label="CPF"
                    variant="outlined"
                    onChange={(e) => handleChange(e)}
                    error={!inputValid.cpf.valido}
                    helperText={inputValid.cpf.msg}
                />

                <TextField
                    name="valorRenda"
                    value={data.valorRenda}
                    fullWidth
                    margin="normal"
                    label="Valor da Renda"
                    variant="outlined"
                    onChange={(e) => handleChangeRenda(e)}
                    error={!inputValid.valorRenda.valido}
                    helperText={inputValid.valorRenda.msg}
                />



                <LocalizationProvider fullWidth dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
                    <DatePicker
                        fullWidth
                        label="Data de nascimento"
                        value={data.dataNascimento}
                        onChange={(newValue) => {
                            setData((values => ({
                                ...values,
                                dataNascimento: newValue,
                            })));
                        }}
                        renderInput={(params) => <TextField
                            margin="normal"
                            fullWidth
                            text-align="center"
                            {...params} />}
                    />
                </LocalizationProvider>

                <Button fullWidth type="submit" size="large" variant="contained"> Salvar</Button>
                <Button fullWidth size="large" variant="outlined" onClick={handleForm}> Cancelar</Button>

            </form>
        </>
    );
}

export default withStyles(styles)(Form);