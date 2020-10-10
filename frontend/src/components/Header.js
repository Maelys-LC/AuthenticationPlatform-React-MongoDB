import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useDispatch, useSelector} from "react-redux"
import { Redirect, Route, useHistory } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  


export default function Header() {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()
    const name = useSelector((state) => {return state.name})

    function signOut() {
        dispatch({type: 'SIGN_OUT'})
        history.push("/")
    }
    
    return (
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" className={classes.title}>Dashboard</Typography>
            
            <Typography variant="h6" className={classes.title}>{name}</Typography>
            <Button color="secondary" onClick={signOut}>Sign Out</Button>
        </Toolbar>
        </AppBar>
    )
}
