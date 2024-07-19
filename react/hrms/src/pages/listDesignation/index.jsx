// import { useEffect , } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getDesignationData } from "../../store/listDesignation";
// import { useNavigate } from "react-router-dom";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import axios from 'axios';
// import AddDesignation from "../addDesignation";
// import UpdateDesignation from "../updateDesignation";
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { deleteDesignation } from "../../api/deleteDesignation";




// const Designation = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); 
//   const designationData = useSelector((state) => state.designationData.data);
//   const isLoading = useSelector((state) => state.designationData.status); 

//   useEffect(() => {
//     dispatch(getDesignationData());
//   }, [dispatch]); 


//   const handleEmployee = () => {
//     navigate("/employee");
//   };

//   const handleDelete =async(designation_id) => {
//     await deleteDesignation(designation_id);
//     console.log("Designation deleted successfully")

//   }
  

//   const handleLogout= () =>{
//     console.log("logout")
//     const url=`${import.meta.env.VITE_APP_BASE_URL}/logout`
//      return (
//       axios.post(url).then(
//         (resp)=>{
//           console.log("logged out successfully")
//           navigate("/")
//           return resp;
//         },
//         (error) =>{
//           console.log(error,"errorrrr")
//           return error;
//         }
//       )
//      )
//   }

//   return (
//     <>  

//       {isLoading === "pending" ? (
//         <div>LOADING ...</div>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 1000 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="right">Designation id</TableCell>
//                 <TableCell align="right">Designation Name</TableCell>
//                 <TableCell align="right">Maximum Leave</TableCell>
                

//                 {/* <TableCell align="right">Leaves Taken</TableCell>
//                 <TableCell align="right">Maximum Leave</TableCell> */}
//                 <TableCell align="right">Actions</TableCell> {/* Added Actions column */}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {designationData.map((data) => (
//                 <TableRow
//                   key={data.employee_id}
//                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                 >
//                   <TableCell align="right">{data.designation_id}</TableCell>
//                   <TableCell align="right">{data.designation_name}</TableCell>
//                   <TableCell align="right">{data.maximum_leave}</TableCell>
//                   <TableCell align="right">           
//                     <Button variant="outlined" onClick={() => handleDelete(data.designation_id)} startIcon={<DeleteIcon />}>
//                    Delete
//                   </Button></TableCell>
            
//                   {/* <TableCell align="right">{data.leave_taken}</TableCell>
//                   <TableCell align="right">{data.maximum_leave}</TableCell> */}
//                   <TableCell align="right"><Button size="small" disableElevation><UpdateDesignation designationData={data} designationId={data.designation_id}/></Button></TableCell>
       

//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <br />

//       {/* <button onClick={handleHome}>Go Home</button> */}
//       <button onClick={handleLogout} id="logout">Logout</button>
//       <button onClick={handleEmployee} id="employee">Employee Details</button>
      

//       <AddDesignation />
//     </>
//   );
// };

// export default Designation;



import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDesignationData } from '../../store/listDesignation';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import AddDesignation from '../addDesignation';
import UpdateDesignation from '../updateDesignation';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDesignation } from '../../api/deleteDesignation';
import Navbar from '../designationNavbar'; // Import Navbar component

const Designation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const designationData = useSelector((state) => state.designationData.data);
  const isLoading = useSelector((state) => state.designationData.status);

  useEffect(() => {
    dispatch(getDesignationData());
  }, [dispatch]);

  const handleDelete = async (designation_id) => {
    await deleteDesignation(designation_id);
    dispatch(getDesignationData())
    console.log('Designation deleted successfully');
  };

  const handleLogout = () => {
    const url = `${import.meta.env.VITE_APP_BASE_URL}/logout`;
    axios.post(url)
      .then((resp) => {
        console.log('logged out successfully');
        navigate('/');
        return resp;
      })
      .catch((error) => {
        console.log(error, 'errorrrr');
      });
  };

  return (
    <>
      <Navbar /> {/* Render Navbar component */}
      {isLoading === 'pending' ? (
        <div>LOADING ...</div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Designation id</TableCell>
                <TableCell align="right">Designation Name</TableCell>
                <TableCell align="right">Maximum Leave</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {designationData.map((data) => (
                <TableRow
                  key={data.designation_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{data.designation_id}</TableCell>
                  <TableCell align="right">{data.designation_name}</TableCell>
                  <TableCell align="right">{data.maximum_leave}</TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" onClick={() => handleDelete(data.designation_id)} startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                    <Button size="small" disableElevation>
                      <UpdateDesignation designationData={data} designationId={data.designation_id} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <br />

      <button onClick={handleLogout} id="logout">Logout</button>
      <AddDesignation />
    </>
  );
};

export default Designation;
