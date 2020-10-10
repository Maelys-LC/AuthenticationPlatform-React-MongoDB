import React, {useState}  from 'react';
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
import jwt from 'jsonwebtoken'
import {useDispatch, useSelector} from "react-redux" 


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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  
  const classes = useStyles()
  const dispatch = useDispatch()
  const id = useSelector((state)=> {return state.id})
  const token = useSelector((state) => {return state.token})

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  

  function changeName(event) {
    setName(event.target.value)
  }

  function changeEmail(event) {
    setEmail(event.target.value)
  }

  async function addContact(event) {
    event.preventDefault()
    await axios.post("http://localhost:8080/add-new-contact", {name: name, email: email, user_affiliate: id}, {headers: {token: token}})
    
    dispatch({type: 'ADD_CONTACT', contact: {name: name, email: email, user_affiliate: id}})
    
    setName("")
    setEmail("")
     
  }

  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">Add a contact</Typography>

        <form className={classes.form} noValidate onSubmit={addContact}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField autoComplete="name" name="name" variant="outlined" value={name} required fullWidth id="name" label="Name" autoFocus onChange={changeName}/>
            </Grid>
            
            <Grid item xs={12}>
              <TextField variant="outlined" value={email} required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={changeEmail}/>
            </Grid>           
            
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Add</Button>
          
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}