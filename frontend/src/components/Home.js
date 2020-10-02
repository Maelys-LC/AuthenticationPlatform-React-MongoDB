import React from "react"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import Button from '@material-ui/core/Button';

export default function Home() {
    return (
        <div>
            <h1>Hello</h1>
            <Button variant="contained"><Link to="/signIn">Sign-In</Link></Button>
            <Button variant="contained" color="primary"><Link to="/signUp">Sgn-Up</Link></Button>
        </div>
        
    )
}