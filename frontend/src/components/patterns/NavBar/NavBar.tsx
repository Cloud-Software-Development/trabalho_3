import React, { useState, useEffect } from 'react'
import styled, {css} from 'styled-components'
import { Link, useHistory  } from 'react-router-dom'

// Foundation
import Typography, { Types, ButtonSize, HeadingSize, CaptionSize } from '../../foudation/Typography'
import MainColors, { NeutralColors } from '../../foudation/Colors'
import Spaces from '../../foudation/Spaces'
import Shadows from '../../foudation/Shadows'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Patterns
import Toast from '../Toast'

// Logo
import Logo from '../../../assets/logo.png'

// Auth
import { UserLogout } from '../../../utils/auth'

export default function NavBar() {

  // const dispathc = useDispatch()
  // dispathc({ type: 'CHANGE_VIES_SIDBAR' })

  let roleUser : any = useSelector(state => state)
  roleUser = roleUser.userRole
  console.log(roleUser)
  
  const [openNavBar, setOpenNavBar] = useState(false)
  const [userLogged, setUserLogged] = useState(false)

  const toast = Toast()
  const history  = useHistory()
  const dispatch = useDispatch()

  const myLink = (name : string) =>{
    return(
      <TextLink style={{cursor: 'pointer'}} > 
        <Typography type={Types.title} size={CaptionSize.caption1} color={NeutralColors.textDetails} style={{fontWeight: 600}}>
          {name}  
        </Typography>
      </TextLink>
    )
  }

  function MakeLogout(){
    dispatch({type: 'CHANGE_ROLE_USER', value: 0})

    UserLogout()
    toast.addNewToast({mensage: 'Deslogado com sucesso!', myType: 'success'})
    history.push("/login")
  }

  return (
    <header>
      <Container>
        <Content backGroundColor={ MainColors.secondary} spaces={Spaces} shadow={Shadows.shadow2} >

          <ContainerLogo>
            <img src={Logo} alt="logo"/>
          </ContainerLogo>
          <LinksContainer logged={roleUser} >
            {
              roleUser == 2 ? (
                <Link to='/superuser' >
                  {myLink('Super Usuário')}
                </Link>
              ) : (
                null
              )
            }

            <Link to='/' >
              {myLink('Validar Documento')}
            </Link>

            {
              roleUser !== 0 ? (
                <Link to='/home' >
                  {myLink('Home')}
                </Link>
              ) : (
                <Link to='/login' >
                  {myLink('Login')}
                </Link>
              )
            }
            {
              roleUser !== 0 ? (
                <div onClick={() => MakeLogout()} >
                  {myLink('Logout')}
                </div>
              ) : (
                <Link to='/register' >
                  {myLink('Register')}
                </Link>
              )
            }

          </LinksContainer>


        </Content>
      </Container>
     
      <LinksContainerResponsive active={openNavBar}>
        <div>
            {
              roleUser == 2 ? (
                <Link to='/superuser' >
                  {myLink('Super Usuário')}
                </Link>
              ) : (
                null
              )
            }
          <Link to='/' >
            {myLink('Validar Documento')}
          </Link>
          {
            userLogged ? (
              <Link to='/home' >
                {myLink('Home')}
              </Link>
            ) : (
              <Link to='/login' >
                {myLink('Login')}
              </Link>
            )
          }
          {
            userLogged ? (
              <div onClick={() => MakeLogout() } >
                {myLink('Logout')}
              </div>
            ) : (
              <Link to='/register' >
                {myLink('Register')}
              </Link>
            )
          }
        </div>
      </LinksContainerResponsive>
      <ButtonNavbar onClick={() => setOpenNavBar(!openNavBar)} active={openNavBar} >
        <div></div>
        <div></div>
        <div></div>
      </ButtonNavbar>
    </header>

  )
}

interface ContentProps {
  backGroundColor:  string,
  shadow: string,
  spaces: {
    horizontalSpacesSite1: string,
    horizontalSpacesSite2: string,
  }
}

interface LinksContainerResponsiveProps {
  active: boolean,
}

interface LinksContainerProps {
  logged: any,
}

interface ButtonNavbarProps {
  active: boolean,
}

const Container = styled.div`
`

const Content = styled.div<ContentProps>`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;

  background-color: ${props => props.backGroundColor};
  padding: 0 ${props => props.spaces.horizontalSpacesSite1};
  box-shadow: ${props => props.shadow};

  @media(max-width: 1200px){
    padding: 0 ${props => props.spaces.horizontalSpacesSite2};
  }

`

const ContainerLogo = styled.div`
    cursor: pointer;
    > img {
      width: 162px;
      height: 30px
    }
` 

const LinksContainer = styled.div<LinksContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;

  ${props => 
    props.logged && props.logged === 2 &&
    css `
      max-width: 600px;
    ` 
    };

  ${props => 
    props.logged && props.logged !== 2 &&
    css `
      max-width: 400px;
    ` 
    };

  @media(max-width: 700px){
    display: none;
  }
` 

const TextLink = styled.div`
  
`

const ButtonNavbar = styled.button<ButtonNavbarProps>`
  position: fixed;
  top: 20px;
  right: 20px;
  flex-direction: column;
  justify-content: space-around;
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 25;
  outline: none;

  > div {
    width: 3rem;
    height: 0.25rem;
    background: #323654;
    border-radius: 10px;
    transition: all 0.3s linear 0s;
    position: relative;
    transform-origin: 1px center;

    &:nth-child(1){
      transform: ${props => props.active ? 'rotate(+45deg)' : 'rotate(0)' }
    }

    &:nth-child(2){
      opacity: ${props => props.active ? 0 : 1}
    }

    &:nth-child(3){
      transform: ${props => props.active ? 'rotate(-45deg)' : 'rotate(0)' }
    }
  }

  display: none;
  @media(max-width: 700px){
    display: flex;
  }
`

const LinksContainerResponsive = styled.div<LinksContainerResponsiveProps>`
  height: 100%;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.5) 2px 0px 5px;
  position: fixed;
  top: 0px;
  right: 0px;
  width: 70%;
  max-width: 400px;
  transition: transform 0.3s ease-out 0s;
  z-index: 20;
  transform: translateX(0px);
  transform: ${props => props.active ? 'translateX(0px)' : 'translateX(100%)' };

  > div {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div {
      margin-bottom: 20px;
    }
  }

`