import React from 'react';
import { Navigate } from 'react-router-dom';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import {
    Alert, 
    Container, 
    Box, 
    TextField, 
    FormControl, 
    IconButton, 
    InputLabel, 
    InputAdornment, 
    OutlinedInput, 
    Button, 
    Collapse,
    Divider,
    Typography
} from '@mui/material';
import {
    Visibility, 
    VisibilityOff, 
} from '@mui/icons-material';

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
    
  return (Auth.loggedIn()) ? 
  (
    <Navigate to="/" />
  ) : 
  (
    <Container 
        sx={{ 
            borderLeft: 1, 
            borderRight: 1, 
            pt: "85px",
            backgroundColor: "white", 
            minHeight: "100vh"
         }}
    >
        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "6ch", p: 1, pb: 4 }}> 
            Join the codeShare community
        </Typography>
        <Box
        sx={{
            display: "flex", 
            flexDirection: 'row', 
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            margin: 1, 
        }}
        >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50%' },
                    '& .MuiFormControl-root': { m: 1, width: '75%' },
                    '& .MuiButton-root': { m: 1, width: '75%' },
                    flexGrow: 1,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h3">Login:</Typography>
                <Box>
                    <TextField
                    required
                    id="login-email"
                    label="Email"
                    onChange={handleLoginChange('email')}
                    />
                </Box>
                <Box>
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
                </Box>
                <Box>
                <Button 
                    id="login-button" 
                    variant="contained" 
                    onClick={handleLoginUser}
                    color="secondary"
                    type="submit"
                    sx={{width: '75%', m: 1}}
                >
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
                </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50%' },
                    '& .MuiFormControl-root': { m: 1, width: '75%' },
                    '& .MuiButton-root': { m: 1, width: '75%' },
                    flexGrow: 1,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h3">Sign up:</Typography>
                <Box>
                    <TextField
                    required
                    id="signup-username"
                    label="Username"
                    onChange={handleSignupChange('username')}
                    />
                </Box>
                <Box>
                    <TextField
                    required
                    id="signup-email"
                    label="Email"
                    onChange={handleSignupChange('email')}
                    />
                </Box>
                <Box>
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
                </Box>
                <Box>
                    <Button 
                    id="signup-button" 
                    variant="contained"
                    color="secondary"
                    onClick={handleCreateUser}
                    type="submit"
                    sx={{width: '75%', m: 1}}>
                        Sign up
                    </Button>
                    <Collapse in={signupErrorVisible}>
                    <Alert 
                    sx={{ m: 1 }} 
                    severity="error"
                    >
                        Ensure all fields are full
                    </Alert>
                </Collapse>
                </Box>
            </Box>
        </Box>
    </Container>
  );
}