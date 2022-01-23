import  React, {useState, useEffect} from 'react';
import { DataGrid} from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEdit from '@mui/icons-material/ModeEdit';




export default function List() {
    const [listapessoas, setListapessoas] = useState([]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'nomeCompleto', headerName: 'Nome Completo', width: 400 },
        { field: 'cpf', headerName: 'CPF', width: 200 },
        { field: 'renda', headerName: 'Valor Renda', width: 130 },
        {field: 'datanascimento',headerName: 'Data nascimento',width: 160},
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
      
      const rows = [
        { id: 1, nomeCompleto: 1, cpf: 'Snow', renda: 'Jon', datanascimento: 35 },
        { id: 2, nomeCompleto: 2, cpf: 'Lannister', renda: 'Cersei', datanascimento: 42 },
        { id: 3, nomeCompleto: 3, cpf: 'Lannister', renda: 'Jaime', datanascimento: 45 },
        { id: 4, nomeCompleto: 4, cpf: 'Stark', renda: 'Arya', datanascimento: 16 },
        { id: 5, nomeCompleto: 5, cpf: 'Targaryen', renda: 'Daenerys', datanascimento: 32 },
        { id: 6, nomeCompleto: 6, cpf: 'Melisandre', renda: 'null', datanascimento: 150 },
        { id: 7, nomeCompleto: 7, cpf: 'Clifford', renda: 'Ferrara', datanascimento: 44 },
        { id: 8, nomeCompleto: 8, cpf: 'Frances', renda: 'Rossini', datanascimento: 36 },
        { id: 9, nomeCompleto: 9, cpf: 'Roxie', renda: 'Harvey', datanascimento: 65 },
      ];

      const fillList = () => {

      }

    const handleDelete = (values) => {
        console.log(values);
    }

    useEffect(() => {
      fillList();
    }, []);
    

  return (
    <div style={{ height: "100vh", width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        //pageSize={5}
        rowsPerPageOptions={[5]}
        //checkboxSelection
        hideFooter
      />
    </div>
  );
}
