import { useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { updateEmployeeData } from '../../store/updateEmployee'; // Import your async thunk action
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios'; // Import axios for API calls
import EditIcon from '@mui/icons-material/Edit';
import { getEmployeeData } from '../../store/employeelist';
import { getDesignationData } from '../../store/listDesignation';
import { MenuItem, Select } from '@mui/material';

const initialValues = {
    employee_name: '',
    address: '',
    phone_number: '',
    email: '',
    des_name: '',
    leave_taken:''
  };
  
  const UpdateEmployee = ({ employeeId }) => {     //eslint-disable-line
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [employee, setEmployee] = useState(initialValues);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    // function refreshPage() {
    //   window.location.reload();
    // }

    const designation = useSelector((state) => state.designationData.data);
    console.log(designation,"desi data")
  
    useEffect(() => {
      dispatch(getDesignationData());
    }, [dispatch]);



    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEmployee({
        ...employee,
        [name]: value,
      });
    };
    // console.log(employee,"EMP")
    
    useEffect(() => {
        const fetchEmployeeDetails = async () => {
          const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/employee/${employeeId}`);
          const employeeData = response.data;
          console.log(employeeData,"EMPLOYEE DATA")
          setEmployee({
            employee_name: employeeData.employee_name,
            address: employeeData.address,
            phone_number: employeeData.phone_number,
            email: employeeData.email,
            des_name: employeeData.des_name, 
            leave_taken: employeeData.leave_taken
          });
      
        };
      
        fetchEmployeeDetails();
      }, [employeeId]);
      
      const handlesuccessCB = () => {
        console.log("success")
        dispatch(getEmployeeData());
        handleClose();
        
      }

      const handleUpdateEmployee = (e) => {
        e.preventDefault();
        dispatch(updateEmployeeData({ data: employee, employee_id: employeeId , successCB:handlesuccessCB }))
          .then(() => {
            handleClose(); 
            // refreshPage()
            // dispatch(getEmployeeData)
    
          })
          .catch((error) => {
            console.error('Error updating employee:', error);
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
        
          {/* <Button  variant='outlined' size="small" onClick={handleOpen} disableElevation>Edit</Button> */}
          <Button variant="outlined" onClick={handleOpen} startIcon={<EditIcon />}>
                   Edit
                  </Button>
          
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
              <form id="my-form" onSubmit={handleUpdateEmployee}>
                <div style={{ marginBottom: '15px' }} id="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="employee_name"
                    value={employee.employee_name}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>
    
                <div style={{ marginBottom: '15px' }} id="form-group">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={employee.address}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>
    
    
                <div style={{ marginBottom: '15px' }} id="form-group">
                  <label>Contact Number:</label>
                  <input
                    type="text"
                    name="phone_number"
                    value={employee.phone_number}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>
    
                <div style={{ marginBottom: '15px' }} id="form-group">
                  <label>Mail id:</label>
                  <input
                    type="text"
                    name="email"
                    value={employee.email}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>
    
                {/* <div style={{ marginBottom: '15px' }} id="form-group">
                  <label>Designation name:</label>
                  <input
                    type="text"
                    name="des_name"
                    value={employee.des_name}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                  
                </div> */}

           <Select
            name="des_name"
            value={employee.des_name}
            onChange={handleInputChange}
            style={inputStyle}
            displayEmpty
            >
              <MenuItem value="" disabled>
              Select Designation
              </MenuItem>
              {designation.map(designation => (
                <MenuItem key={designation.designation_name} value={designation.designation_name}>
                  {designation.designation_name}
                </MenuItem>
              ))}
            </Select>

                <div style={{ marginBottom: '15px' }} id="form-group">
                  <label>Leave taken:</label>
                  <input
                    type="number"
                    name="leave_taken"
                    value={employee.leave_taken}
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

export default UpdateEmployee;

  