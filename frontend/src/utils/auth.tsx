import { AxiosRequestConfig, AxiosResponse } from "axios"
import { useDispatch } from "react-redux"
import API from "./api"
import env from "react-dotenv"

interface UserProps {
  id?: string,
  email?: string,
  password?: string,
  identification?: string,
  name?: string,
  nickname?: string,
}

// Login de usuário
export async function UserLogin({email, password} : UserProps) : Promise<any> {

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  const params = {
    email: email,
    password: password,
  }

  let success = false

  try {
    const res = await API.post<UserProps>('user/auth', params )
    UserSaveLogin(res.data)
    return true

  } catch(err) {
    return err.response.data.error
  }


}

// Registro de usuário
export async function UserRegister({ email, password, identification, name, nickname } : UserProps ){

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const params = {
    email: email,
    password: password,
    identification: identification,
    name: name,
    nickname: nickname,
    admin: false
  }

  const result = await fetch(`${env.BASE_URL}/user`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })

  const userResponse = await result.json()

  if (userResponse.error){
    return userResponse.error
  } else {
    UserSaveLogin(userResponse)
    return true 
  }
}

// Deslogar
export function UserLogout(){
  sessionStorage.clear()
  return true
}

// Salvar usuário no local storage
export function UserSaveLogin(user : any){
  sessionStorage.setItem('user', JSON.stringify(user))
}

// Retorna o usuario logado
export function GetUser(viewAdm = false){

  let user
  let userString

  if(viewAdm){
    userString = sessionStorage.getItem('userView');
  } else {
    userString = sessionStorage.getItem('user');
  } 
  if(userString !== null){
    user = JSON.parse(userString);
    return user.user
  } else {
    return false
  }
}

export async function UpdateUser(userIdAdm: any = false){
  const user = GetUser()
  if(userIdAdm){
    await API.get(`user/${userIdAdm.id }`)
    .then(res => {
      sessionStorage.setItem('userView', JSON.stringify(res.data))
      console.log(1111111111111111111111111111111)

    })
    .catch(err => {
      console.log(err.response)
    })
  }else {
    API.get(`user/${user.id}`)
    .then(res => {
      UserSaveLogin(res.data)
    })
    .catch(err => {
      console.log(err.response)
    })
  }
  
}

// Retorna o token do usuário
export function GetToken(){
  const user = GetUser()
  return user.token
}

// Retorna qual o cargo do usuário
export function GetUserRole(){
  const dispatch = useDispatch()
  
  const user = GetUser()
  console.log(user)
  
  if(user){
    const role = user.admin 
    dispatch({type: 'CHANGE_ROLE_USER', value: role ? 2 : 1})
    return role ? 2 : 1

  } else {
    dispatch({type: 'CHANGE_ROLE_USER', value: 0})
    return 0
  }
}

export function GetUserId(viewAdmActive = false){
  if(viewAdmActive){
    const user = GetUser(viewAdmActive)
    return user.id
  } else {
    const user = GetUser()
    return user.id
  }
}