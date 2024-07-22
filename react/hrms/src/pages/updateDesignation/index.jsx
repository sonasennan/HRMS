import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateDesignationData } from '../../store/updateDesignation'; 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { getDesignationData } from '../../store/listDesignation';

const initialValues = {
    designation_name: '',
    maximum_leave: ''
  };
  
  const UpdateDesignation = ({ designationId }) => {    //eslint-disable-line
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [designation, setDesignation] = useState(initialValues);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setDesignation({
        ...designation,
        [name]: value,
      });
    };

    const handleSuccessCB = () => {
      handleClose();
      dispatch(getDesignationData())
    }
                                                              
    
    useEffect(() => {
        const fetchDesignationDetails = async () => {
          const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/designation/${designationId}`);
          const designationData = response.data;
          console.log(designationData,"")
          setDesignation({
            designation_name: designationData.designation_name,
            maximum_leave: designationData.maximum_leave,
          });
        //   handleOpen(); // Open modal once data is fetched
        };
      
        fetchDesignationDetails();
      }, [designationId]);
      
      const handleUpdateDesignation = (e) => {
        e.preventDefault();
        dispatch(updateDesignationData({ data: designation, designation_id: designationId ,successCB:handleSuccessCB}))
          .then(() => {
            handleClose(); // Close modal after successful update
          })
          .catch((error) => {
            console.error('Error updating designation:', error);
          });
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
        
          <Button  variant='outlined' size="small" onClick={handleOpen} disableElevation>Edit</Button>
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
              <form id="my-form" onSubmit={handleUpdateDesignation}>
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

export default UpdateDesignation;

  