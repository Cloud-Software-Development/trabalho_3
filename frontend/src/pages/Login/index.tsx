import React, { useState } from 'react'
import styled, { css } from 'styled-components'

// Patterns
import BoxContainer from '../../components/patterns/BoxContainer/BoxContainer'

// Foundation
import Typography, { Types, ButtonSize, HeadingSize, CaptionSize } from '../../components/foudation/Typography'
import MainColors, { NeutralColors }  from '../../components/foudation/Colors'
import Spaces from '../../components/foudation/Spaces'


// Primitives
import MyButton from '../../components/primitives/Button'
import MyInput from '../../components/primitives/MyInput'

// API
import { UserLogin } from '../../utils/auth'
import { useHistory } from 'react-router'
import Toast from '../../components/patterns/Toast'


export default function Login() {

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const [errorLogin, setErrorLogin] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  const history = useHistory()
  const toast = Toast()

  async function MakeLogin(){
    if(userEmail === ''){
      setErrorEmail('*Campo de email obrigatório!')
      toast.addNewToast({ mensage: 'Campo de email obrigatório!', myType: 'error' })
      return
    }

    if(userPassword === ''){
      setErrorPassword('*Campo de senha obrigatório!')
      toast.addNewToast({ mensage: 'Campo de senha obrigatório!', myType: 'error' })

      return
    }

    setErrorEmail('')
    setErrorPassword('')

    const sucessLogin = await UserLogin({email: userEmail, password: userPassword})

    if( sucessLogin !== true  ){
      toast.addNewToast({ mensage: `${sucessLogin}`, myType: 'error' })
      setErrorLogin(sucessLogin)
    } else {
      toast.addNewToast({ mensage: 'Login realizado com sucesso', myType: 'success' })
      history.push('/home')
    }
  } 

  return (
    <Container space={Spaces} >

          <Content>
            <BoxContainer >
              <ContentInput style={{padding: '20px'}} >

                <HeadContainer>
                  <Typography type={Types.title} size={HeadingSize.heading2} color={NeutralColors.textDetails} style={{fontWeight: 500}} >
                    Login
                  </Typography>
                </HeadContainer>

                <InputContent>
                  <Typography type={Types.title} size={HeadingSize.heading5} color={NeutralColors.textDetails} style={{fontWeight: 500}} >
                    Email:
                  </Typography>
                  <MyInput type='text' textplaceholder='Ex: teste@email.com' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                  <ErrorMensage>
                    {errorEmail}
                  </ErrorMensage>
                </InputContent>

                <InputContent>
                  <Typography type={Types.title} size={HeadingSize.heading5} color={NeutralColors.textDetails} style={{fontWeight: 500}} >
                    Senha:
                  </Typography>
                  <MyInput type='password' textplaceholder='Ex: *****' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                  <ErrorMensage>
                    {errorPassword}
                  </ErrorMensage>
                </InputContent>

                <ErrorMensage>
                  {errorLogin}
                </ErrorMensage>

                <ContainerButton>
                  <MyButton myFunction={() => MakeLogin()} >
                    <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textPrimary}>
                      Logar
                    </Typography>
                  </MyButton>
                </ContainerButton>

              </ContentInput>
            </BoxContainer>
          </Content>
        </Container>  
  )
}

interface ContainerProps {
  space: {
    horizontalSpacesSite1: string,
    horizontalSpacesSite2: string,
  }
}
const Container = styled.div<ContainerProps>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.space &&
    css`
          padding: 12.78vh ${props.space.horizontalSpacesSite1};
    `}
  
  @media (max-width: 1200px){
    ${(props) =>
      props.space &&
      css`
            padding: 12.78vh ${props.space.horizontalSpacesSite2};
      `}
  }
`

const Content = styled.div`
  max-width: 400px;
  width: 100%;
  height: 400px;
`

const ContentInput = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around
`

const HeadContainer = styled.div`

`

const InputContent = styled.div`
  > input {
  }
`

const ContainerButton = styled.div`
  width: 120px;
  height: 45px;
`

const ErrorMensage = styled.p`
  outline: none;
  color: red;
  font-size: 1.25rem;
  font-family: 'Roboto';

`