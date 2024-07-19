import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postEmployeeData, getEmployeeData } from '../../store/employeelist';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const initialValues = {
  employee_name: '',
  address: '',
  phone_number: '',
  email: '',
  des_name: ''
};

const AddEmployee = ({ open, handleClose, handleOpen }) => {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let pattern;

    switch (name) {
      case 'phone_number':
        pattern = /^[6789][0-9]{9}$/;
        break;
      case 'email':
        pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        break;
      default:
        pattern = null;
        break;
    }

    const isValid = pattern ? pattern.test(value) : true;
    setErrors({
      ...errors,
      [name]: isValid ? '' : `Invalid`
    });

    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const handleSuccessCB = (data) => {
    console.log("success callback called for adding employee");
    console.log("success data", data);
    dispatch(getEmployeeData());
    handleClose();
    resetForm();
  };

  const handleAddEmployee = () => {
    console.log(employee, 'employee data');
    dispatch(postEmployeeData({ employee: employee, successCB: handleSuccessCB }));
  };


  const resetForm = () => {
    setEmployee(initialValues);
    setErrors({});
    setErrorMessage('');
  };

  const Validate = (e) => {
    e.preventDefault(); 

    let isValid = true;
    const newErrors = {};

    // Perform validation checks
    if (!/^[6789][0-9]{9}$/.test(employee.phone_number)) {
      newErrors.phone_number = "Invalid";
      isValid = false;
    }

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(employee.email)) {
      newErrors.email = "Invalid";
      isValid = false;
    }

    // Update errors state
    setErrors(newErrors);

    // If valid, proceed with form submission
    if (isValid) {
      handleAddEmployee();
      handleClose();
    } else {
      setErrorMessage('Form has errors. Please fix them before submitting.');
    }
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

  return (
    <div id="m">
      <Button onClick={handleOpen} style={buttonn}>Add employee</Button>
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
          <form id="my-form" onSubmit={(e) => Validate(e)}>
            {errorMessage && (
              <Typography variant="body1" style={{ color: 'red', marginBottom: '10px' }}>
                {errorMessage}
              </Typography>
            )}
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
                id="n"
                name="phone_number"
                value={employee.phone_number}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
              {errors.phone_number && <span style={{ color: 'red' }}>{errors.phone_number}</span>}
            </div>

            <div style={{ marginBottom: '15px' }} id="form-group">
              <label>Mail id:</label>
              <input
                type="text"
                name="email"
                id="e"
                value={employee.email}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
              {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            </div>

            <div style={{ marginBottom: '15px' }} id="form-group">
              <label>Designation Name:</label>
              <input
                type="text"
                name="des_name"
                value={employee.des_name}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>

            <div>
              <button type="button" style={buttonn} onClick={Validate}>
                Add
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={handleClose} style={buttonn}>Close</button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddEmployee;
















// // import { useState } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { postEmployeeData , getEmployeeData} from '../../store/employeelist';
// // import Box from '@mui/material/Box';
// // import Button from '@mui/material/Button';
// // import Typography from '@mui/material/Typography';
// // import Modal from '@mui/material/Modal';

 
// // const initialValues = {
// //   employee_name:'',
// //   address:'',
// //   phone_number:'',
// //   email:'',
// //   des_id:''
// // };

// // const AddEmployee = ({open,handleClose,handleOpen}) => {
// //   const dispatch = useDispatch();
// //   // const [open, setOpen] = useState(false);
// //   const [employee, setEmployee] = useState(initialValues);




// //   // const handleOpen = () => setOpen(true);

// //   // const handleClose = () => {
// //   //   setOpen(false);
// //   //   setEmployee(initialValues);
// //   //   // dispatch(getEmployeeData())
// //   //   // refreshPage() 
    
// //   // };
// //   //  console.log(employee,"EEEEEE")

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setEmployee({
// //       ...employee,
// //       [name]: value,
// //     });
// //   };
// // //   function refreshPage() {
// // //     window.location.reload();  
// // // }
// //   const handleSuccessCB =(data) => {
// //   console.log("succes cb called for adding employee")
// //   console.log("success data",data)
// //   dispatch(getEmployeeData());
// //     handleClose();
    
// //   }

// //   const handleAddEmployee = (e) => {
// //     e.preventDefault();
// //     console.log(employee, 'employee data');
// //     dispatch(postEmployeeData({ employee: employee ,successCB:handleSuccessCB}));
     
// //   };

// //   const style = {
// //     position: 'absolute',
// //     top: '50%',
// //     left: '50%',
// //     transform: 'translate(-50%, -50%)',
// //     width: 400,
// //     bgcolor: 'background.paper',
// //     border: '2px solid #000',
// //     boxShadow: 24,
// //     p: 4,
// //   };

// //   return (
// //     <>
// //     <div id="m">
// //       <Button onClick={handleOpen} style={buttonn}>Add employee</Button>
// //       <Modal
// //         open={open}
// //         onClose={handleClose}
// //         aria-labelledby="modal-modal-title"
// //         aria-describedby="modal-modal-description"
// //       >
// //         <Box sx={style}>
// //           <Typography id="modal-modal-title" variant="h6" component="h2">
// //             Add
// //           </Typography>
// //           <form id="my-form">
// //             <div style={{ marginBottom: '15px' }} id="form-group">
// //               <label>Name:</label>
// //               <input
// //                 type="text"
// //                 name="employee_name"
// //                 value={employee.employee_name}
// //                 onChange={handleInputChange}
// //                 style={inputStyle}
// //                 required
// //               />
// //             </div>

// //             <div style={{ marginBottom: '15px' }} id="form-group">
// //               <label>Address:</label>
// //               <input
// //                 type="text"
// //                 name="address"
// //                 value={employee.address}
// //                 onChange={handleInputChange}
// //                 style={inputStyle}
// //                 required
// //               />
// //             </div>


// //             <div style={{ marginBottom: '15px' }} id="form-group">
// //               <label>Contact Number:</label>
// //               <input
// //                 type="text"
// //                 name="phone_number"
// //                 value={employee.phone_number}
// //                 onChange={handleInputChange}
// //                 style={inputStyle}
// //                 required
// //               />
// //             </div>

// //             <div style={{ marginBottom: '15px' }} id="form-group">
// //               <label>Mail id:</label>
// //               <input
// //                 type="text"
// //                 name="email"
// //                 value={employee.email}
// //                 onChange={handleInputChange}
// //                 style={inputStyle}
// //                 required
// //               />
// //             </div>

// //             <div style={{ marginBottom: '15px' }} id="form-group">
// //               <label>Designation id:</label>
// //               <input
// //                 type="number"
// //                 name="des_id"
// //                 value={employee.des_id}
// //                 onChange={handleInputChange}
// //                 style={inputStyle}
// //                 required
// //               />
// //             </div>


// //             <div>
              
// //               <button type="submit" style={buttonn} onClick={handleAddEmployee}>
// //                 Add
// //               </button>
// //                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// //                   <button onClick={handleClose} style={buttonn}>Close</button>
// //             </div>
// //           </form>
// //         </Box>
// //       </Modal>
// //     </div>
// //     </>
// //   );
// // };

// // const inputStyle = {
// //   width: '80%',
// //   padding: '8px',
// //   fontSize: '16px',
// //   border: '1px solid #ddd',
// //   borderRadius: '4px',
// // };



// // const buttonn = {
// //     backgroundColor: 'transparent',  
// //     color: '#2196F3',               
// //     border: '2px solid #2196F3',     
// //     padding: '12px 20px',
// //     textAlign: 'center',
// //     textDecoration: 'none',
// //     display: 'inline-block',
// //     fontSize: '16px',
// //     marginTop: '10px',
// //     cursor: 'pointer',
// //     borderRadius: '4px',
// //   };

// // export default AddEmployee;


// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { postEmployeeData , getEmployeeData} from '../../store/employeelist';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

 
// const initialValues = {
//   employee_name:'',
//   address:'',
//   phone_number:'',
//   email:'',
//   des_name:''
// };

// const AddEmployee = ({open,handleClose,handleOpen}) => {
//   const dispatch = useDispatch();
//   // const [open, setOpen] = useState(false);
//   const [employee, setEmployee] = useState(initialValues);




//   // const handleOpen = () => setOpen(true);

//   // const handleClose = () => {
//   //   setOpen(false);
//   //   setEmployee(initialValues);
//   //   // dispatch(getEmployeeData())
//   //   // refreshPage() 
    
//   // };
//   //  console.log(employee,"EEEEEE")

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee({
//       ...employee,
//       [name]: value,
//     });
//   };
// //   function refreshPage() {
// //     window.location.reload();  
// // }
//   const handleSuccessCB =(data) => {
//   console.log("succes cb called for adding employee")
//   console.log("success data",data)
//   dispatch(getEmployeeData());
//     handleClose();
    
//   }

//   const handleAddEmployee = (e) => {
//     e.preventDefault();
//     console.log(employee, 'employee data');
//     dispatch(postEmployeeData({ employee: employee ,successCB:handleSuccessCB}));
     
//   };

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

//   return (
//     <>
//     <div id="m">
//       <Button onClick={handleOpen} style={buttonn}>Add employee</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Add
//           </Typography>
//           <form id="my-form">
//             <div style={{ marginBottom: '15px' }} id="form-group">
//               <label>Name:</label>
//               <input
//                 type="text"
//                 name="employee_name"
//                 value={employee.employee_name}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }} id="form-group">
//               <label>Address:</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={employee.address}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>


//             <div style={{ marginBottom: '15px' }} id="form-group">
//               <label>Contact Number:</label>
//               <input
//                 type="text"
//                 name="phone_number"
//                 value={employee.phone_number}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }} id="form-group">
//               <label>Mail id:</label>
//               <input
//                 type="text"
//                 name="email"
//                 value={employee.email}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }} id="form-group">
//               <label>Designation Name:</label>
//               <input
//                 type="text"
//                 name="des_name"
//                 value={employee.des_name}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>


//             <div>
              
//               <button type="submit" style={buttonn} onClick={handleAddEmployee}>
//                 Add
//               </button>
//                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                   <button onClick={handleClose} style={buttonn}>Close</button>
//             </div>
//           </form>
//         </Box>
//       </Modal>
//     </div>
//     </>
//   );
// };

// const inputStyle = {
//   width: '80%',
//   padding: '8px',
//   fontSize: '16px',
//   border: '1px solid #ddd',
//   borderRadius: '4px',
// };



// const buttonn = {
//     backgroundColor: 'transparent',  
//     color: '#2196F3',               
//     border: '2px solid #2196F3',     
//     padding: '12px 20px',
//     textAlign: 'center',
//     textDecoration: 'none',
//     display: 'inline-block',
//     fontSize: '16px',
//     marginTop: '10px',
//     cursor: 'pointer',
//     borderRadius: '4px',
//   };

// export default AddEmployee;










//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { postEmployeeData , getEmployeeData} from '../../store/employeelist';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

 
// const initialValues = {
//   employee_name:'',
//   address:'',
//   phone_number:'',
//   email:'',
//   des_id:''
// };

// const AddEmployee = ({open,handleClose,handleOpen}) => {
//   const dispatch = useDispatch();
//   // const [open, setOpen] = useState(false);
//   const [employee, setEmployee] = useState(initialValues);




//   // const handleOpen = () => setOpen(true);

//   // const handleClose = () => {
//   //   setOpen(false);
//   //   setEmployee(initialValues);
//   //   // dispatch(getEmployeeData())
//   //   // refreshPage() 
    
//   // };
//   //  console.log(employee,"EEEEEE")

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee({
//       ...employee,
//       [name]: value,
//     });
//   };
// //   function refreshPage() {
// //     window.location.reload();  
// // }
//   const handleSuccessCB =(data) => {
//   console.log("succes cb called for adding employee")
//   console.log("success data",data)
//   dispatch(getEmployeeData());
//     handleClose();
    
//   }

//   const handleAddEmployee = (e) => {
//     e.preventDefault();
//     console.log(employee, 'employee data');
//     dispatch(postEmployeeData({ employee: employee ,successCB:handleSuccessCB}));
     
//   };

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

//   return (
//     <>
//     <div id="m">
//       <Button onClick={handleOpen} style={buttonn}>Add employee</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Add
//           </Typography>
//           <form id="my-form">
//             <div style={{ marginBottom: '15px' }} id="form-group">
//               <label>Name:</label>
//               <input
//                 type="text"
//                 name="employee_name"
//                 value={employee.employee_name}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }} id="form-group">
//               <label>Address:</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={employee.address}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>


//             <div style={{ marginBottom: '15px' }} id="form-group">
//               <label>Contact Number:</label>
//               <input
//                 type="text"
//                 name="phone_number"
//                 value={employee.phone_number}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }} id="form-group">
//               <label>Mail id:</label>
//               <input
//                 type="text"
//                 name="email"
//                 value={employee.email}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }} id="form-group">
//               <label>Designation id:</label>
//               <input
//                 type="number"
//                 name="des_id"
//                 value={employee.des_id}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>


//             <div>
              
//               <button type="submit" style={buttonn} onClick={handleAddEmployee}>
//                 Add
//               </button>
//                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                   <button onClick={handleClose} style={buttonn}>Close</button>
//             </div>
//           </form>
//         </Box>
//       </Modal>
//     </div>
//     </>
//   );
// };

// const inputStyle = {
//   width: '80%',
//   padding: '8px',
//   fontSize: '16px',
//   border: '1px solid #ddd',
//   borderRadius: '4px',
// };



// const buttonn = {
//     backgroundColor: 'transparent',  
//     color: '#2196F3',               
//     border: '2px solid #2196F3',     
//     padding: '12px 20px',
//     textAlign: 'center',
//     textDecoration: 'none',
//     display: 'inline-block',
//     fontSize: '16px',
//     marginTop: '10px',
//     cursor: 'pointer',
//     borderRadius: '4px',
//   };

// export default AddEmployee;