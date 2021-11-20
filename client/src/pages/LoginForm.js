import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';

export default function LoginForm() {
  const [values, setValues] = React.useState({
    loginUsername: '',
    loginEmail: '',
    loginPassword: '',
    showLoginPassword: false,
    signupUsername: '',
    signupEmail: '',
    signupPassword: '',
    showSignupPassword: false,
  });
   
  // Updates value of login or email password to what's typed
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Switches between password dots and visible letters for login password
  const handleClickShowLoginPassword = () => {
    setValues({
        ...values,
        showLoginPassword: !values.showLoginPassword,
    });
  };

  // Switches between password dots and visible letters for signup password
  const handleClickShowSignupPassword = () => {
    setValues({
        ...values,
        showSignupPassword: !values.showSignupPassword,
    });
  };
    
  return (
    <Container 
        sx={{display: "flex"}}
    >
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '30ch' },
                '& .MuiFormControl-root': { m: 1, width: '30ch' },
                '& .MuiButton-root': { m: 1, width: '30ch' }
            }}
        >
            <h1>Login:</h1>
            <div>
                <TextField
                required
                id="login-username"
                label="Username"
                onChange={handleChange('loginUsername')}
                />
            </div>
            <div>
                <TextField
                required
                id="login-email"
                label="Email"
                onChange={handleChange('loginEmail')}
                />
            </div>
            <div>
                <FormControl variant="outlined">
                <InputLabel htmlFor="login-password">Password</InputLabel>
                <OutlinedInput
                    id="login-password"
                    type={values.showLoginPassword ? 'text' : 'password'}
                    value={values.loginPassword}
                    onChange={handleChange('loginPassword')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowLoginPassword}
                        edge="end"
                        >
                        {values.showLoginPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
                </FormControl>
            </div>
            <div sx={{ }}>
                <Button id="login-button" variant="contained">Login</Button>
            </div>
        </Box>

        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '30ch' },
                '& .MuiFormControl-root': { m: 1, width: '30ch' },
                '& .MuiButton-root': { m: 1, width: '30ch' }
            }}
        >
            <h1>Sign Up:</h1>
            <div>
                <TextField
                required
                id="signup-username"
                label="Username"
                onChange={handleChange('signupUsername')}
                />
            </div>
            <div>
                <TextField
                required
                id="signup-email"
                label="Email"
                onChange={handleChange('signupEmail')}
                />
            </div>
            <div>
                <FormControl variant="outlined">
                <InputLabel htmlFor="signup-password">Password</InputLabel>
                <OutlinedInput
                    id="signup-password"
                    type={values.showSignupPassword ? 'text' : 'password'}
                    value={values.signupPassword}
                    onChange={handleChange('signupPassword')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowSignupPassword}
                        edge="end"
                        >
                        {values.showSignupPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
                </FormControl>
            </div>
            <div sx={{ }}>
                <Button id="signup-button" variant="contained">Sign up</Button>
            </div>
        </Box>


    
    </Container>
  );
}