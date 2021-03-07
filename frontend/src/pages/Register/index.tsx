import React, { useState, useEffect } from 'react'
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
import { UserLogin, UserRegister } from '../../utils/auth'
import { useHistory } from 'react-router'
import Toast from '../../components/patterns/Toast'

export default function Register() {

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userIdPublic, setUserIdPublic] = useState('')
  const [userName, setUserName] = useState('')
  const [userNickname, setUserNickname] = useState('')

  const [errorLogin, setErrorLogin] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorIdPublic, setErrorIdPublic] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorNickName, setErrorNickName] = useState('')


  const history = useHistory()
  const toast = Toast()

  // Verifica se Você está logado
  useEffect(() => {  

  }, [])


  async function Regiter(){

    if(userName === ''){
      setErrorName('*Campo de nome obrigatório!')
      return
    }
    setErrorName('')

    if(userNickname === ''){
      setErrorNickName('*Campo de nome obrigatório!')
      return
    }
    setErrorNickName('')
    
    if(userIdPublic === ''){
      setErrorIdPublic('*Campo de CPF obrigatório!')
      return
    }
    setErrorIdPublic('')

    if(userEmail === ''){
      setErrorEmail('*Campo de email obrigatório!')
      return
    }
    setErrorEmail('')


    if(userPassword === ''){
      setErrorPassword('*Campo de senha obrigatório!')
      return
    }
    setErrorPassword('')

    const userRegisted = await UserRegister({
      email: userEmail,
      password: userPassword,
      identification: userIdPublic,
      name: userName,
      nickname: userName
    })

    if(userRegisted === true){
      history.push('/home')
      toast.addNewToast({mensage: 'Registrado com sucesso', myType: 'success'})
    } else{
      toast.addNewToast({mensage: `${userRegisted}`, myType: 'success'})
    }
  }

  return (
    <Container space={Spaces} >

          <Content>
            <BoxContainer >
              <ContentInput style={{padding: '20px'}} >

                <HeadContainer>
                  <Typography type={Types.title} size={HeadingSize.heading2} color={NeutralColors.textDetails} style={{fontWeight: 500}} >
                    Sign up
                  </Typography>
                </HeadContainer>

                <InputContent>
                  <Typography type={Types.title} size={HeadingSize.heading5} color={NeutralColors.textDetails} style={{fontWeight: 500}} >
                    Nome:
                  </Typography>
                  <MyInput type='text' textplaceholder='Ex: Gustavo Lima' value={userName} onChange={(e) => setUserName(e.target.value)} />
                  <ErrorMensage>
                    {errorName}
                  </ErrorMensage>
                </InputContent>

                <InputContent>
                  <Typography type={Types.title} size={HeadingSize.heading5} color={NeutralColors.textDetails} style={{fontWeight: 500}} >
                    Nickname:
                  </Typography>
                  <MyInput type='text' textplaceholder='Ex: Gustavo Lima' value={userNickname} onChange={(e) => setUserNickname(e.target.value)} />
                  <ErrorMensage>
                    {errorNickName}
                  </ErrorMensage>
                </InputContent>

                <InputContent>
                  <Typography type={Types.title} size={HeadingSize.heading5} color={NeutralColors.textDetails} style={{fontWeight: 500}} >
                    CPF:
                  </Typography>
                  <MyInput type='text' textplaceholder='Ex:123-456-789-00' value={userIdPublic} onChange={(e) => setUserIdPublic(e.target.value)} />
                  <ErrorMensage>
                    {errorIdPublic}
                  </ErrorMensage>
                </InputContent>
                
                <InputContent>
                  <Typography type={Types.title} size={HeadingSize.heading5} color={NeutralColors.textDetails} style={{fontWeight: 500}} >
                    Email:
                  </Typography>
                  <MyInput type='text' textplaceholder='Ex: seuemail@email.com' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
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
                  <MyButton myFunction={() => Regiter()} >
                    <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textPrimary}>
                      Registrar
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
  height: 600px;
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