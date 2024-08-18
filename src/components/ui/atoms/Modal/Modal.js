import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgColor: 'background.paper',
  background: '#FFF',
  boxShadow: 10,
  p: 4,
};

const BasicModal = ({ children, open, handleClose }) => {
    return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {children}
          </Box>
        </Modal>
    );
  };

export default BasicModal;