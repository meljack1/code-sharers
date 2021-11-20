import React from 'react';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Alert from '@mui/material/Alert';
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
import Collapse from '@mui/material/Collapse';

import Auth from '../utils/auth';

export default function LoginForm() {
  const [loginInput, setLoginValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [signupInput, setSignupValues] = React.useState({
    username: '',
    email: '',
    password: '',
    showPassword: false,
  })

  const [loginErrorVisible, setLoginErrorVisible] = React.useState(false);
  const [signupErrorVisible, setSignupErrorVisible] = React.useState(false);

  const [login, {errorLoginUser, loginData}] = useMutation(LOGIN_USER);
  const [createUser, {errorCreateUser, signupData}] = useMutation(ADD_USER);
  
  // Updates value of login form input fields as value is changed
  const handleLoginChange = (prop) => (event) => {
    setLoginValues({ ...loginInput, [prop]: event.target.value });
  };

// Updates value of signup form input fields as value is changed
  const handleSignupChange = (prop) => (event) => {
    setSignupValues({ ...signupInput, [prop]: event.target.value });
  };

// Logic to login a user
  const handleLoginUser = async (event) => {
    event.preventDefault();
    console.log(loginInput);
    setLoginErrorVisible(false);
    setSignupErrorVisible(false);

    if (!loginInput.email || !loginInput.password) {
        setLoginErrorVisible(true);
    }

    try {
        const { data } = await login({
          variables: { email: loginInput.email, password: loginInput.password },
        });
  
        Auth.login(data.login.token);
    } catch (error) {
        console.error(error);
    }
  
    setLoginValues({
        email: '',
        password: '',
    });
  }

  // Logic to create a user
  const handleCreateUser = async (event) => {
    event.preventDefault();
    setLoginErrorVisible(false);
    setSignupErrorVisible(false);

    if (!signupInput.username || !signupInput.email || !signupInput.password) {
        setSignupErrorVisible(true);
    }
    
    try {
        const { data } = await createUser({
          variables: { username: signupInput.username, email: signupInput.email, password: signupInput.password },
        });
  
        Auth.login(data.addUser.token);
    } catch (error) {
        console.error(error);
    }
  }

  // Switches between password dots and visible letters for login password
  const handleClickShowLoginPassword = () => {
    setLoginValues({
        ...loginInput,
        showPassword: !loginInput.showPassword,
    });
  };

  // Switches between password dots and visible letters for signup password
  const handleClickShowSignupPassword = () => {
    setSignupValues({
        ...signupInput,
        showPassword: !signupInput.showPassword,
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
                id="login-email"
                label="Email"
                onChange={handleLoginChange('email')}
                />
            </div>
            <div>
                <FormControl variant="outlined">
                <InputLabel htmlFor="login-password">Password</InputLabel>
                <OutlinedInput
                    id="login-password"
                    type={loginInput.showPassword ? 'text' : 'password'}
                    value={loginInput.password}
                    onChange={handleLoginChange('password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowLoginPassword}
                        edge="end"
                        >
                        {loginInput.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
                </FormControl>
            </div>
            <div sx={{ }}>
            <Button id="login-button" variant="contained" onClick={handleLoginUser}>
                Login
            </Button>
            <Collapse in={loginErrorVisible}>
                <Alert 
                sx={{ m: 1 }} 
                severity="error"
                >
                    Login details incorrect
                </Alert>
            </Collapse>
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
                onChange={handleSignupChange('username')}
                />
            </div>
            <div>
                <TextField
                required
                id="signup-email"
                label="Email"
                onChange={handleSignupChange('email')}
                />
            </div>
            <div>
                <FormControl variant="outlined">
                <InputLabel htmlFor="signup-password">Password</InputLabel>
                <OutlinedInput
                    id="signup-password"
                    type={signupInput.showPassword ? 'text' : 'password'}
                    value={signupInput.password}
                    onChange={handleSignupChange('password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowSignupPassword}
                        edge="end"
                        >
                        {signupInput.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
                </FormControl>
            </div>
            <div>
                <Button 
                id="signup-button" 
                variant="contained"
                onClick={handleCreateUser}>Sign up</Button>
                <Collapse in={signupErrorVisible}>
                <Alert 
                sx={{ m: 1 }} 
                severity="error"
                >
                    Ensure all fields are full
                </Alert>
            </Collapse>
            </div>
        </Box>
    </Container>
  );
}