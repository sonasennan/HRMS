
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import {logout} from '../../api/logout';
import { useNavigate } from "react-router-dom";
import { Stack } from '@mui/material';

export default function ButtonAppBar() {
   
  const navigate=useNavigate()

  const handleLogout= () =>{
    logout()
    navigate("/")
  }

  const handleDesignation = () => {
    navigate("/designation");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Human Resource Management System
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Stack spacing={2} direction="row">
          
          <Button color="inherit" onClick={handleDesignation}>Designations</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
