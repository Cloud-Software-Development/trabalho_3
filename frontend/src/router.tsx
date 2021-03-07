import React from 'react'
import { useDispatch } from 'react-redux'
import {Route, Switch, BrowserRouter, useParams, Redirect, Router} from 'react-router-dom'
import Toast from './components/patterns/Toast'

// Rotas
import AdmHome from './pages/AdmHome'
import Login from './pages/Login'
import PublicHome from './pages/PublicHome'
import Register from './pages/Register'
import SuperUser from './pages/SuperUser'

// Utils
import { GetUser, GetUserRole } from './utils/auth'

export default function Routes() {
  
  const dispatch = useDispatch()
  dispatch({type: 'CHANGE_VIEW_USER', value: false})

  const userRole = GetUserRole()

  GetUserRole()
  return (
    <Switch>
      {/* Public Router */}
      <Route path={'/'} exact component={PublicHome} />
      <Route path={'/login'} exact component={Login} />
      <Route path={'/register'} exact component={Register} />

      {/* User Router */}
      <PrivateRouteAdmin path={'/home'} exact component={AdmHome}  />
      
      {/* AdminRouter */}
      <PrivateRouteSuperUser path={'/superuser'} exact component={SuperUser} />
      {
        userRole === 2 ? (
          <Route path={'/home/:id'} children={<Child />}  />
        ) : (
          null
        )
      }
    </Switch>
  )
}

function Child(){
  const id  = useParams()
  return(
    AdmHome({ userIdAdm: id })
  )
}

// Rotas de administradores
const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  const toast = Toast()
 
  const userRole = GetUserRole()

  if(userRole === 0){
    toast.addNewToast({mensage: 'Realize login como usário!', myType: 'warning'})
  }

  return (
    <Route 
      {...rest}
      render={props =>
        userRole !== 0 ? (                                                                   
          <Component {...props} />                                                    
        ) : (
          <Redirect to={{pathname:"/login", state: {from: props.location }}} />    
        )
      }
    />
  )
}

// Rotas de Superuser
const PrivateRouteSuperUser = ({ component: Component, ...rest }) => {
  const toast = Toast()
 
  const userRole = GetUserRole()
  if(userRole !== 2){
    toast.addNewToast({mensage: 'Realize login como SuperUsário!', myType: 'warning'})
  }

  return (
    <Route 
      {...rest}
      render={props =>
        userRole === 2 ? (                                                                   
          <Component {...props} />                                                    
        ) : (
          <Redirect to={{pathname:"/login", state: {from: props.location }}} />    
        )
      }
    />
  )
}