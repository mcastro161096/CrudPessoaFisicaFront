import  React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Modal({openModal, handleModal, handleAcceptModal, handleCloseModal}) {
  const [open, setOpen] = useState(openModal);

  const handleClose = () => {
    setOpen(false);
    handleModal();
    handleCloseModal();
  };

  const handleAccept = () => {
    setOpen(false);
    handleAcceptModal();
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);
  

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Tem certeza que deseja excluir?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao concordar esse registro será excluído, isso não pode ser desfeito!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button onClick={handleAccept} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
