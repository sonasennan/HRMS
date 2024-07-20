import { useEffect ,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeData } from "../../store/employeelist";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddEmployee from "../addEmployee";
import Button from '@mui/material/Button';
import UpdateEmployee from "../updateEmployee";
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteEmployee} from '../../api/deleteEmployee';
import ButtonAppBar from "../navbarHome";
// import {logout} from '../../api/logout';


const Employee = () => {

  
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const employeeData = useSelector((state) => state.employeeData.data);
  const isLoading = useSelector((state) => state.employeeData.status); 
  const [open, setOpen] = useState(false);


  console.log("EmplyeeData: ", employeeData)

  useEffect(() => {
    dispatch(getEmployeeData());
  }, [dispatch]); 

  // const handleHome = () => {
  //   navigate("/");
  // };

  // const handleDesignation = () => {
  //   navigate("/designation");
  // };

  const handleEachEmployee = (employee_id) => {
    navigate(`/employee/${employee_id}`);
  };

  // function refreshPage() {
  //   window.location.reload();
  // }

  const handleDelete =async(employee_id) => {
    await deleteEmployee(employee_id);
    // refreshPage()
    dispatch(getEmployeeData())
    console.log("Employee deleted successfully")

  }
  

  // const handleLogout= () =>{
  //   logout()
  //   navigate("/")
  // }

  

  const handleClose = () => {
    setOpen(false);
    
    console.log("setopen close")
  };
  const handleOpen =()=>{
    setOpen(true)
  }

  return (
    <>  
      {isLoading === "pending" ? (
        <div>LOADING ...</div>
      ) : (
        
        <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
          <ButtonAppBar />
          
          <Table sx={{ minWidth: 1000 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Employee id</TableCell>
                <TableCell align="right">Employee Name</TableCell>
                <TableCell align="right">Designation</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Leaves</TableCell>

                {/* <TableCell align="right">Leaves Taken</TableCell>
                <TableCell align="right">Maximum Leave</TableCell> */}
                <TableCell align="center">Actions</TableCell> {/* Added Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeData.map((data) => (
                <TableRow
                  key={data.employee_id}
                  className="table-row"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                 
                  hover // Add hover effect
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell align="right">{data.employee_id}</TableCell>
                  <TableCell align="right">{data.employee_name}</TableCell>
                  <TableCell align="right">{data.des_name}</TableCell>
                  <TableCell align="right">{data.phone_number}</TableCell>
                  <TableCell align="right">{data.leave_taken}/{data.maximum_leave}</TableCell>
                  {/* <TableCell align="right">{data.leave_taken}</TableCell>
                  <TableCell align="right">{data.maximum_leave}</TableCell> */}
                  <TableCell align="right">

                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="medium" 
                      onClick={() => handleEachEmployee(data.employee_id)}
                      style={{ marginLeft: '10px'}}
                    >
                      View Details
                    </Button>
                    
                    {/* <UpdateEmployee employeeId={data.employee_id}/> */}
                    <Button size="small" disableElevation><UpdateEmployee employeeId={data.employee_id}/></Button>
                    <Button variant="outlined" onClick={() => handleDelete(data.employee_id)} startIcon={<DeleteIcon />} sx={{ color: "red" }}>
                   Delete
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <br />

      {/* <button onClick={handleHome} id="goHome">Go Home</button> */}
      {/* <button onClick={handleLogout} id="logout">Logout</button> */}
      {/* <button onClick={handleDesignation} id="designation">Designations</button> */}

      <AddEmployee 
      open ={open}
      handleClose ={handleClose}
      handleOpen={handleOpen}
       />

    </>
  );
};

export default Employee;

