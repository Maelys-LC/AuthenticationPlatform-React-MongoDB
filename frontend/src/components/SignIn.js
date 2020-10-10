import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Redirect, Route, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import jwt from 'jsonwebtoken'



// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  let history = useHistory()
  const classes = useStyles();
  const dispatch = useDispatch()
  // const id = useSelector((state) => {return state.id})
  // const token = useSelector((state) => {return state.token})

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [redirect, setRedirect] = useState(false)

  function changeEmail(event) {
    setEmail(event.target.value)
  }

  function changePassword(event) {
    setPassword(event.target.value)
  }

  async function getContacts(id, token){
    let results = await axios.get("http://localhost:8080/get-contacts/" + id, {headers: {token: token}})
    dispatch({type: 'GET_CONTACTS', contacts: results.data})
  }
  

  async function connexion(event) {
    event.preventDefault()
    let results = await axios.post("http://localhost:8080/sign-in", {email: email, password: password})
    await dispatch({type: 'ADD_TOKEN', token: results.data.token})
    let token = await results.data.token
    let decoded = await jwt.decode(token) 
    await dispatch({type: 'USER', user: decoded})
    await getContacts(decoded.id, token)
    history.push('/dashboard')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Sign in</Typography>
        <form className={classes.form} noValidate onSubmit={connexion}>
          <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={changeEmail}/>
          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={changePassword}/>
          
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign In</Button>
          
          
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}

