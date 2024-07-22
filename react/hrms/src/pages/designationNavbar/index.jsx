
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  const handleEmployee = () => {
    navigate('/employee');
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
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="home"
          onClick={handleHome}
          sx={{ mr: 2 }}
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Designation Management
        </Typography>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="employee"
          onClick={handleEmployee}
          sx={{ mr: 2 }}
        >
          <PersonIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="logout"
          onClick={handleLogout}
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
