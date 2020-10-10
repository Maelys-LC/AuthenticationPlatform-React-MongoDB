import React from 'react';
import '../style/ContactsList.css'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';


// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1      
//     },
//     demo: {
//       backgroundColor: theme.palette.background.paper,
//     },
//     title: {
//       margin: theme.spacing(4, 0, 2),
//     }
// }));


export default function ContactList() {
  const dispatch = useDispatch()
  const token = useSelector((state) => {return state.token})
  const contactsList = useSelector((state) => {return state.contacts})
  console.log(contactsList);

  async function deleteSingleContact(name, email, user_affiliate) {
    dispatch({type: "DELETE_SINGLE_CONTACT", name: name, email: email, user_affiliate: user_affiliate})
    await axios.post("http://localhost:8080/deleteSingleContact", {name: name, email: email, user_affiliate: user_affiliate}, {headers: {token: token}})
  }
  const contacts = []
    for (const [index, contact] of contactsList.entries()) {
      contacts.push(
        <div key={index} className="contacts">
          <p><PersonIcon/><strong>Name: </strong> {contact.name}</p>
          <p><MailOutlineIcon/><strong>Email: </strong> {contact.email}</p>
          <div class="delete" onClick={() => deleteSingleContact(contact.name, contact.email, contact.user_affiliate)}><DeleteIcon/></div>            
        </div>
      )
    }
  
    return (
      // <div className={classes.root}>     
        
      //     <Grid id="contacts">
      //       <Typography variant="h3" className={classes.title}>Contacts</Typography>
      //       <div className={classes.demo}>
      //         <List dense={dense}>
      //           {/* {generate( */}
      //             {contacts}
      //           {/* )} */}
      //         </List>
      //       </div>
      //     </Grid>        
      // </div>
      <section>
        <h1>Contacts</h1>
        {contacts}
      </section>

    );
}
  