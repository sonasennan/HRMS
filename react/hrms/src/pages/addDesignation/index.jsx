import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postDesignationData } from '../../store/addDesignation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {getDesignationData} from '../../store/listDesignation';
 
const initialValues = {
  designation_name:'',
  maximum_leave:'',
};

const AddDesignation = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [designation, setDesignation] = useState(initialValues);
  // console.log(designation,"DESIGNATION")

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDesignation(initialValues); // Reset form fields when closing modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDesignation({
      ...designation,
      [name]: value,
    });
  };

  const handleSuccessCB = (data) => {
    console.log("success data",data);
    handleClose();
    dispatch(getDesignationData());
    
  }

  const handleAddDesignation = (e) => {
    e.preventDefault();
    // console.log(designation,"DESI")
    dispatch(postDesignationData({ designation: designation ,successCB: handleSuccessCB}));
    handleClose();
     
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
    <div id="m">
      <Button onClick={handleOpen} style={buttonn}>Add Designation</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add
          </Typography>
          <form id="my-form" onSubmit={handleAddDesignation}>
            <div style={{ marginBottom: '15px' }} id="form-group">

              <label>Designation Name:</label>
              <input
                type="text"
                name="designation_name"
                value={designation.designation_name}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>


            <div style={{ marginBottom: '15px' }} id="form-group">
              <label>Maximum Leave:</label>
              <input
                type="number"
                name="maximum_leave"
                value={designation.maximum_leave}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>


            <div>
              <button type="submit" style={buttonn}>
                Add
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={handleClose} style={buttonn}>Close</button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
    </>
  );
};

const inputStyle = {
  width: '80%',
  padding: '8px',
  fontSize: '16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
};



const buttonn = {
    backgroundColor: 'transparent',  
    color: '#2196F3',               
    border: '2px solid #2196F3',     
    padding: '12px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    marginTop: '10px',
    cursor: 'pointer',
    borderRadius: '4px',
  };

export default AddDesignation;
