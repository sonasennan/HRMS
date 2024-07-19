import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postLoginData } from '../../store/login';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

 
const initialValues = {
  username:'',
  password:''
};

const Login = () => {
  const dispatch = useDispatch();
  // const currentStatus = useSelector((state) => state.formData.status);
  const [open, setOpen] = useState(false);
  const [loginData, setLoginData] = useState(initialValues);
  const [error,setError]=useState(null)
  const navigate = useNavigate()
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setLoginData(initialValues); // Reset form fields when closing modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLoginClick=() =>{
    navigate("/employee")
  }

  const handleSuccessCB=() => {
    return (handleLoginClick())
  }

  const handleErrorCB=(data) =>{
    setError(data)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(postLoginData({ loginData: loginData , successCB:handleSuccessCB ,errorCB:handleErrorCB }));
    // handleClose(); // Close modal after form submission
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
      <Button onClick={handleOpen} style={buttonn}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            LOGIN HERE
          </Typography>
          <form id="my-form" onSubmit={handleLogin}>
            <div style={{ marginBottom: '15px' }} id="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
           
            <div style={{ marginBottom: '15px' }} id="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>

            {error}
            <div>
              <button onClick={handleLogin} style={buttonn}>
                Login
              </button>
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
    backgroundColor: 'transparent',  // Transparent background
    color: '#2196F3',                // Blue text color
    border: '2px solid #2196F3',     // Blue border
    padding: '12px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    marginTop: '10px',
    cursor: 'pointer',
    borderRadius: '4px',
  };

export default Login;
