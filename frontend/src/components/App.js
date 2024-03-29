import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom"
import SignIn from './SignIn';
import SignUp from './SignUp'
import '../style/Home.css'
import Dashboard from './Dashboard'
import Home from './Home'
import ContactsList from './ContactsList'
import {useSelector} from "react-redux"


export default function App() {
    return (
        <main>
            <Router>                
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>  
                    <Route path="/list">
                        <ContactsList/>
                    </Route>                 
                    <Route path="/signUp">
                        <Home/>
                        <SignUp/>
                    </Route> 

                    <PrivateRoute path="/dashboard">
                        <Dashboard/>
                    </PrivateRoute>                         
                   
                    <Route path="/">
                        <Home/>
                        <SignIn/>
                    </Route>         
                </Switch>                
            </Router>
            
        </main>
    )
}


function PrivateRoute({children, ...rest}) {
    const token = useSelector(state => state.token)
    return (
        <Route 
            {...rest}
            render={({location})=> {
                if (token) {
                    return (children)
                } else {
                    return (<Redirect to={{pathname:'/', state: {from: location}}}/>)
                }
            }}
        />
    )
}
