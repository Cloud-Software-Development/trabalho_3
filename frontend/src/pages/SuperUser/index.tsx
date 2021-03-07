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

// API
import { GetToken, UserLogin } from '../../utils/auth'
import API from '../../utils/api'

// Componentes externos
import { AiOutlineFileImage, AiOutlineFilePdf } from 'react-icons/ai'
import { FaTrashAlt, FaFileDownload } from 'react-icons/fa'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import Toast from '../../components/patterns/Toast'
import { FiEye, FiTrash } from 'react-icons/fi'

export default function SuperUser() {

  const [myUsers, setMyUsers] = useState<any>([])

  useEffect(() => {
    GetAllUsers()
  }, [])

  const toast = Toast()

  async function GetAllUsers(){
    API.get('user')
      .then(res => {
        console.log(res)
        setMyUsers(res.data.users)
      })
      .catch(err => {
        console.log(err.response)
        console.log(err)
      })
  } 

  // Colunas da tabela
  const columnsDoc = [
    {
      name: 'id',
      selector: 'id',
      sortable: true,
      maxWidth: '400px',
    },
    {
      name: 'Nome',
      selector: 'name',
      sortable: true,
      maxWidth: '400px',
    },
    {
      name: 'CPF',
      selector: 'identification',
      sortable: true,
      maxWidth: '400px',
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,        
      maxWidth: '400px',
    },
    {
      name: 'Visualizar',
      maxWidth: '400px',
      cell: (row: any, index: any, column: any, id: any) => ViewUser(row)
    },
    {
      name: 'Deletar',
      maxWidth: '400px',
      cell: (row: any, index: any, column: any, id: any) => DeleteUser(row)
    },
  ];

  function ViewUser(row: any){

    return(
      <ContainerDonwloadButton>
        <Link to={`/home/${row.id}`}>
          <FiEye size={30} />
        </Link>
      </ContainerDonwloadButton>
    )
  }

  function DeleteUser(row){

    const delet = async (id) => {
      API.delete(`user/${id}`)
        .then(res => {
          toast.addNewToast({mensage: 'Usuário deletado com sucesso', myType: 'success'})
          GetAllUsers()
        })
        .catch(err => {
          toast.addNewToast({mensage: 'Erro ao deletar usuário', myType: 'error'})
        })
    }

    return(
      <ContainerDonwloadButton onClick={() => delet(row.id)} >
        <FiTrash size={30}/>
      </ContainerDonwloadButton>
    )
  }

  return (
    <Container space={Spaces}>
  
      <BoxContainer>
        <ContainerDocsUser>
          <DataTable
              title="Usuário do sistema"
              columns={columnsDoc}
              data={myUsers}
              pagination
              customStyles={customStyles}
            />
        </ContainerDocsUser>
      </BoxContainer>

    </Container>
  )
}

// Estilização da tabela
const customStyles = {
  header: {
    style: {
      fontFamily: 'Open Sans',
      fontSize: '1.5rem',
      color: '#323654'
    },
  },
  headCells: {
    style: {
      fontFamily: 'Open Sans',
      fontSize: '1.25rem',
      color: '#323654'
    },
  },
  cells: {
    style: {
      fontFamily: 'Open Sans',
      fontSize: '1.125rem',
      color: '#323654'
    },
  },
}

interface ContainerProps {
  space: {
    horizontalSpacesSite1: string,
    horizontalSpacesSite2: string
  }
}

// Estilização
const Container = styled.div<ContainerProps>`
  margin-top: 80px;
  ${(props) =>
    props.space &&
    css`
          padding: 10.78vh ${props.space.horizontalSpacesSite1};
    `}
  
  @media (max-width: 1200px){
    ${(props) =>
      props.space &&
      css`
            padding: 10.78vh ${props.space.horizontalSpacesSite2};
      `}
  }
`

const ContainerHeaderUser = styled.div`
  height: 120px;
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 25px;
`

const ContainerUploadButton = styled.div`
  width: 120px;
  height: 45px;
  
`

const ContentPerfil = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  > img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
    cursor: pointer;
  }
`

const ContainerDocsUser = styled.div`
  min-height: 400px;
  height: auto;
  width: 100%;
  padding: 25px 25px;
`

const ContainerDonwloadButton = styled.div`
  > svg {
    color: #7E7E7E;
    transition: all 0.5s ease;
    cursor: pointer;
  }

  > svg:hover {
    color: #123B6E;
  }
`