import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

// Patterns
import BoxContainer from '../../components/patterns/BoxContainer/BoxContainer'
import Modal from '../../components/patterns/Modal/Modal'

// Foundation
import Typography, { Types, ButtonSize, HeadingSize, CaptionSize } from '../../components/foudation/Typography'
import MainColors, { NeutralColors }  from '../../components/foudation/Colors'
import Spaces from '../../components/foudation/Spaces'

// Primitives
import MyButton from '../../components/primitives/Button'
import MyInput from '../../components/primitives/MyInput'

// API
import { GetToken, GetUser, GetUserId, UpdateUser, UserLogin, UserSaveLogin } from '../../utils/auth'
import API from '../../utils/api'

// Componentes externos
import { AiOutlineCloseCircle, AiOutlineEye, AiOutlineFileImage, AiOutlineFilePdf, AiOutlineFileText } from 'react-icons/ai'
import { FaTrashAlt, FaFileDownload } from 'react-icons/fa'
import { GrDocumentWord } from 'react-icons/gr'
import DataTable from 'react-data-table-component'

// Componentes
import Toast from '../../components/patterns/Toast'
import { useDispatch, useSelector } from 'react-redux'

interface AdmHomeParams {
  userIdAdm: any
}

export default function AdmHome({ userIdAdm } : AdmHomeParams) {

  const toast = Toast()
  const dispatch = useDispatch()

  let viewAdm: any = useSelector(state => state)

  console.log(viewAdm.userView)




  // Magica
  const [magic, setMagic] = useState<any>([])

  // Informações do usuário
  const [userInfo, setUserInfo] = useState<any>('')
  const [userDocuments, setuserDocuments] = useState<any>([])

  // Loadding de dados
  const [fullLoading, setFullLoading] = useState(false)

  // Modal dos logss
  const [myModal, setMyModal] = useState<any>(null)
  const [myOpenModal, setMyOpenModal] = useState<any>(false)

  // Modal Upload
  const [myModalUpload, setMyModalUpload] = useState<any>(false)
  const [myModalUploadState, setMyModalUploadState] = useState<any>({
    file: '',
    filename: '', 
  })

  // Modal atualizar perfil
  const [myModalEditPerfil, setMyModalEditPerfil] = useState<any>(false)
  const [myModalEditPerfilState, setMyModalEditPerfilState] = useState<any>({
    name: '',
    email: '',
    password: '',
    nickname: '',
    identification: ''
  })

  // Modal telefone
  const [myModalTelephone, setMyModalTelephone] = useState(false)
  const [myModalTelephoneState, setMyModalTelephoneState] = useState<Array<any>>([])

  // Modal telefone
  const [myModalNewTelephone, setMyModalNewTelephone] = useState(false)
  const [myModalNewTelephoneState, setMyModalNewTelephoneState] = useState('')

  const [viewAdmActive, setViewAdmActive] = useState(false)

  useEffect(() => {
    let user

    const asyncInit = async () => {
      if( userIdAdm ){
        dispatch({type: 'CHANGE_VIEW_USER', value: true})
        setViewAdmActive(true)
        await UpdateUser(userIdAdm)
        user = GetUser(true)
        UpdateDoc(true)
        callBackFunction(user)

      } else {
        UpdateUser()
        await UpdateDoc(false)
        user = GetUser(viewAdmActive)
        callBackFunction(user)
      }
    }
    asyncInit()

    function callBackFunction(user) {
      console.log(22222222222222222222222222)
      
      setMyModalEditPerfilState({
        name: user.name,
        email: user.email,
        password: user.password,
        nickname: user.nickname,
        identification: user.identification
      })
      
      setUserInfo({
        name: user.name,
        email: user.email,
        password: user.password,
        nickname: user.nickname,
        identification: user.identification
      })
      
      setMyModalTelephoneState(user.Telephone ? user.Telephone : [])
    }

  }, [])

  // Colunas da tabela
  const columnsDoc = [
    {
      name: 'Tipo de documento',
      selector: 'contentType',
      sortable: true,
      maxWidth: '400px',
      cell: (row: any, index: any, column: any, id: any) => TypeDocRow(row)
    },
    {
      name: 'Id',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Nome',
      selector: 'filename',
      sortable: true,
      maxWidth: '400px',
      cell: (row: any, index: any, column: any, id: any) => NameDocRow(row)
    },
    {
      name: 'Sucesso',
      selector: 'id',
      sortable: true,
      maxWidth: '400px',
      cell: (row: any, index: any, column: any, id: any) => LogValidadeRow(row, 'sucess')
    },
    {
      name: 'Rejeitados',
      selector: 'id',
      sortable: true,        
      maxWidth: '400px',
      cell: (row: any, index: any, column: any, id: any) => LogValidadeRow(row, 'failed')
    },
    {
      name: 'Link',
      selector: 'selfLink',
      sortable: true,
      maxWidth: '400px',
      cell: (row: any, index: any, column: any, id: any) => SelfLink(row)
    },
    {
      name: 'Donwload',
      sortable: false,
      maxWidth: '400px',
      cell: (row: any, index: any, column: any, id: any) => DonwloadDocumentRow(row)
    },
    {
      name: 'Excluir',
      sortable: false,
      maxWidth: '400px',
      cell: (row: any, index: any, column: any, id: any) => DeleteDocumentRow(row)
    },
  ];

  // =============================
  // Elemtentos da Linha da Tabela
  // =============================
  
  // Apresenta o tipo de Documento
  function TypeDocRow(file){
    const types = ['image/jpeg', 'application/pdf', 'image/png', 'text/plain', 'application/msword']

    const positionType = types.indexOf(file.contentType)

    switch (positionType) {
      case 0:
        return(
          <ImageTypeDoc key={file.id}>
            <AiOutlineFileImage size={50} color='black' />
            <Typography type={Types.title} size={HeadingSize.heading7} color={NeutralColors.textDetails} >
              JPEG
            </Typography>
          </ImageTypeDoc>
        )
      case 1:
        return (
          <ImageTypeDoc key={file.id}>
            <AiOutlineFilePdf  size='50' color='black' />
            <Typography type={Types.title} size={HeadingSize.heading7} color={NeutralColors.textDetails} >
              PDF
            </Typography>
          </ImageTypeDoc>
        )
      case 2:
        return (
          <ImageTypeDoc key={file.id}>
            <AiOutlineFileImage size={50} color='black' />
            <Typography type={Types.title} size={HeadingSize.heading7} color={NeutralColors.textDetails} >
              PNG
            </Typography>
          </ImageTypeDoc>
        )
      case 3:
        return (
          <ImageTypeDoc key={file.id}>
            <AiOutlineFileText size={50} color='black' />
            <Typography type={Types.title} size={HeadingSize.heading7} color={NeutralColors.textDetails} >
              TEXT
            </Typography>
          </ImageTypeDoc>
        )
      case 4:
        return (
          <ImageTypeDoc key={file.id}>
            <GrDocumentWord  size='50' color='black' />
            <Typography type={Types.title} size={HeadingSize.heading7} color={NeutralColors.textDetails} >
              DOC
            </Typography>
          </ImageTypeDoc>
        )
      default:
        break;
    }
  }

  // Apresenta o nome do Documento
  function NameDocRow(row){
    const name = row.filename

    return(
      <Typography type={Types.body} color={NeutralColors.textDetails} size={HeadingSize.heading7} style={{}} >
        {name}
      </Typography>
    )
  }

  
  // Apresenta o log do Documento
  function LogValidadeRow(document, type='sucess'){
    if(type === 'sucess'){
      const number = document.failed
      return(
        <ContainerLogValidade onClick={() => OpenNewModal(document.filename, document.sucessed, 'Log de sucesso')} >
          <Typography type={Types.body} color={NeutralColors.textDetails} size={HeadingSize.heading7} style={{}} >
            {document.sucessed.length}
          </Typography>
          <AiOutlineEye />
        </ContainerLogValidade>
      )
    } else {
      return(
        <ContainerLogValidade onClick={() => OpenNewModal(document.filename,  document.failed, 'Log de falhas')} >
          <Typography type={Types.body} color={NeutralColors.textDetails} size={HeadingSize.heading7} style={{}} >
            { document.failed.length}
          </Typography>
          <AiOutlineEye />
        </ContainerLogValidade>
      )
    }
  }

  // Apresenta o link
  function SelfLink(row){

    return (
      <div style={{height: '50px', whiteSpace: 'nowrap', width: '100px', overflow: 'auto'}} > 
        <Typography type={Types.body} color={NeutralColors.textDetails} size={HeadingSize.heading7} style={{wordWrap: 'break-word', }} >
          <a href={row.selfLink} target='_blanck' >
            {row.selfLink}
          </a>
        </Typography>
      </div>
    )
  }

  // Faz o download do documento
  function DonwloadDocumentRow(row){
    return (
      <a href={row.mediaLink} target='_blanck' >
        <ContainerDeletButton>
          <FaFileDownload size={30} />
        </ContainerDeletButton>
      </a>
    )
  }

  // Deleta o documento
  function DeleteDocumentRow(row){

    const userToken = GetToken()

    const delet = async () => {
      API.delete(`/document/${row.id}`)
        .then( response => {

          UpdateDoc(viewAdmActive)
          toast.addNewToast({ mensage: 'Documento deletado com sucesso!', myType: 'success'})
        })
        .catch( err => {
          toast.addNewToast({ mensage: 'Falha ao deletar documento!', myType: 'error'})
        })
    }

    return(
      <ContainerDeletButton onClick={() => delet()} >
        <FaTrashAlt size='30' />
      </ContainerDeletButton>
    )
  }

  // =============================
  // FIM - Elemtentos da Linha da Tabela
  // =============================

  // Novo Telefone
  async function NewTelphone(){
    const userId = GetUserId(viewAdmActive)
    const telephone = {
      userId: userId,
      phone: myModalNewTelephoneState
    }

    API.post('telephone', telephone)
      .then(res => {
        let newArray = myModalTelephoneState
        newArray.push(res.data.telephone)
        setMyModalTelephoneState(newArray)
        SaveTelephoneLoca()
        setMyModalNewTelephone(false)
        toast.addNewToast({mensage: 'Sucesso ao adicionar telefone!', myType: 'success'})
        setMyModalNewTelephoneState('')
      })
      .catch(err => {
        toast.addNewToast({mensage: 'Erro ao adicionar telefone!', myType: 'error'})
      })
  }

  // Salvar telefone no local
  function SaveTelephoneLoca(){
    let user = GetUser(viewAdmActive)

    user.Telephone = myModalTelephoneState
    console.log({user: user})
    sessionStorage.setItem(`${viewAdmActive ? 'userView' : 'user'}`, JSON.stringify({user: user}))

  } 

  // Editar Telefone
  async function EditTelephone(){

    const tam = myModalTelephoneState.length

    let error = false
    for (let i = 0; i < tam; i++) {

      await API.put(`telephone/${myModalTelephoneState[i].id}`, {
        phone: myModalTelephoneState[i].phone
      })
        .then(res => {
        })
        .catch(res => {
          error = true
        })
    }
    if(error){
      toast.addNewToast({ mensage: 'Erro ao editar telefone!', myType: 'error' })
    } else {
      toast.addNewToast({ mensage: 'Telefones editados com sucesso!', myType: 'success' })
      SaveTelephoneLoca()
      setMyModalTelephone(false)
    }
  }

  // Abre o modal dos logs
  function OpenNewModal(nameDoc, log, title){
    const dataModal = {
      title: title,
      nameDoc: nameDoc,
      log: log
    }
    setMyModal(dataModal)
    setMyOpenModal(true)
  }

  // Editar perfil
  async function EditInfoPerfil(){

    const userId = GetUserId(viewAdmActive)

    const params = {
      name: myModalEditPerfilState.name,
      nickname: myModalEditPerfilState.nickname,
      email: myModalEditPerfilState.email,
      password: myModalEditPerfilState.password
    }
    await API.put(`user/${userId}`, params)
      .then( res => {
        if(viewAdmActive){
          sessionStorage.setItem('userView', JSON.stringify(res.data))
        } else {
          UserSaveLogin(res.data)
        }
      })
      .catch(res => {
      })

    const user = GetUser(viewAdmActive)

    setMyModalEditPerfilState({
      name: user.name,
      email: user.email,
      password: user.password,
      nickname: user.nickname,
      identification: user.identification
    })

    setUserInfo({
      name: user.name,
      email: user.email,
      password: user.password,
      nickname: user.nickname,
      identification: user.identification
    })

    setMyModalEditPerfil(false)
  }

  // Atualiza liste de documentos
  async function  UpdateDoc(active = false){
    const userId = GetUserId(active)
    API.get(`document/?user=${userId}`)
      .then(res => { 
        setuserDocuments(res.data.documents)
      })
      .catch(res => console.log(res))
  }

  // Faz o upload de um novo arquivo
  async function UploadNewFile(){
    const userId = GetUserId(viewAdmActive)
    const acceptedTypes = ['image/jpeg', 'application/pdf', 'image/png', 'text/plain', 'application/msword']

    const fileName = myModalUploadState.filename
    const file = myModalUploadState.file

    if(acceptedTypes.indexOf(file.type) < 0) { 
      toast.addNewToast({mensage: `Tipo de arquivo inválido: ${file.type}`, myType: 'error'})
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('userId', userId)

    const headers = {
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    }

    API.post('document', formData)
      .then(res => {
        toast.addNewToast({mensage: 'Sucesso ao cadastrar documento', myType: 'success'})
        setMyModalUpload(false)
        UpdateDoc(viewAdmActive)
      })
      .catch(res => {
        toast.addNewToast({mensage: `${res.error}`, myType: 'error'})
      })
  }

  return (
    <>
    <Container space={Spaces}>
      {
        fullLoading || true ? (
          <> 
            <BoxContainer>
            <ContainerHeaderUser>
              <ContentPerfil>
                <img src={'https://http2.mlstatic.com/D_NQ_NP_614041-MLB27185740295_042018-O.jpg'} alt='perfil' onClick={() => setMyModalEditPerfil(true)} />
                <Typography type={Types.title} size={HeadingSize.heading6} color={NeutralColors.textDetails}>
                  {userInfo?.name}
                </Typography>
              </ContentPerfil>
              <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}} >
                <ContainerUploadButton style={{ marginRight: '20px'}} >
                  <MyButton myFunction={() => setMyModalTelephone(true)} >
                    <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textPrimary}>
                      Editar Telefone
                    </Typography>
                  </MyButton>
                </ContainerUploadButton>
                <ContainerUploadButton style={{ marginRight: '20px'}} >
                  <MyButton myFunction={() => setMyModalNewTelephone(true)} >
                    <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textPrimary}>
                      Novo telefone
                    </Typography>
                  </MyButton>
                </ContainerUploadButton>
                <ContainerUploadButton style={{ marginRight: '20px'}} >
                  <MyButton myFunction={() => setMyModalEditPerfil(true)} >
                    <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textPrimary}>
                      Editar Perfil
                    </Typography>
                  </MyButton>
                </ContainerUploadButton>
                <ContainerUploadButton>
                  <MyButton myFunction={() => setMyModalUpload(true)} >
                    <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textPrimary}>
                      Upload
                    </Typography>
                  </MyButton>
                </ContainerUploadButton>
              </div>

            </ContainerHeaderUser>
          </BoxContainer>
          <BoxContainer>
            <ContainerDocsUser>
              <DataTable
                title="Meus documentos"
                columns={columnsDoc}
                data={userDocuments}
                pagination
                customStyles={customStyles}
              />
            </ContainerDocsUser>
          </BoxContainer>
        </>
        ) : (
          null
        )
      }
    </Container>
    {/* Modal de Logs */}
    {myOpenModal && myModal ? (
      <Modal title={myModal.title} nameDoc={myModal.nameDoc} data={myModal.log} open={myOpenModal} setOpenModal={setMyOpenModal} />
    ) : (
      null
    )}
    {/* Modal de Upload */}
    {
      myModalUpload ? (
        <Modal title={'Upload'} open={myModalUpload} setOpenModal={setMyModalUpload} typeModal='input'>
          <div style={{padding: '20px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >
            <div>
              <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textDetails}>
                Escolha um arquivo:
              </Typography>
              <MyInput type='file' id='teste' onChange={(e) => setMyModalUploadState({...myModalUploadState , file: e.target.files[0]})}/>
            </div>
            {/* NOME DO DOCUMENTOS
            <div>
              <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textDetails}>
                Nome do documento:
              </Typography>
              <MyInput type='text' value={myModalUploadState.filename} onChange={(e) => setMyModalUploadState({...myModalUploadState , filename: e.target.value})}  />
            </div>
            */}
            <ContainerUploadButton>
                <MyButton myFunction={() => UploadNewFile()} >
                  <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textPrimary}>
                    Salvar
                  </Typography>
                </MyButton>
              </ContainerUploadButton>
          </div>
        </Modal>
      ) : (
        null
      )
    }
    {/* Modal de EditPerfil */}
    {
      myModalEditPerfil ? (
        <Modal title={'Editar Perfil'} open={myModalEditPerfil} setOpenModal={setMyModalEditPerfil}  typeModal='input'>
          <div style={{padding: '20px', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >
            <div>
              <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textDetails}>
                Nome:
              </Typography>
              <MyInput type='text' value={myModalEditPerfilState.name} onChange={(e) => setMyModalEditPerfilState({...myModalEditPerfilState , name: e.target.value})}/>
            </div>
            <div>
              <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textDetails}>
                Nickname:
              </Typography>
              <MyInput type='text' value={myModalEditPerfilState.nickname} onChange={(e) => setMyModalEditPerfilState({...myModalEditPerfilState , nickname: e.target.value})}/>
            </div>
            <div>
              <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textDetails}>
                CPF:
              </Typography>
              <MyInput type='text' value={myModalEditPerfilState.identification} onChange={(e) => setMyModalEditPerfilState({...myModalEditPerfilState , identification: e.target.value})}/>
            </div>
            <div>
              <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textDetails}>
                Email:
              </Typography>
              <MyInput type='text' value={myModalEditPerfilState.email} onChange={(e) => setMyModalEditPerfilState({...myModalEditPerfilState , email: e.target.value})}  />
            </div>
            <div>
              <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textDetails}>
                Senha:
              </Typography>
              <MyInput type='text' value={myModalEditPerfilState.password} onChange={(e) => setMyModalEditPerfilState({...myModalEditPerfilState , password: e.target.value})}  />
            </div>
            <ContainerUploadButton>
                <MyButton myFunction={() => EditInfoPerfil()} >
                  <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textPrimary}>
                    Salvar
                  </Typography>
                </MyButton>
            </ContainerUploadButton>
          </div>
        </Modal>
      ) : (
        null
      )
    }
    {
      myModalTelephone ? (
        <Modal title={'Editar Perfil'} open={myModalTelephone} setOpenModal={setMyModalTelephone}  typeModal='input'>
          <div style={{padding: '20px', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >
          {
            myModalTelephoneState && myModalTelephoneState.map((cur, key) => {

              const changeValue = (value, index) => {
                let newArray = myModalTelephoneState
                const teste = {
                  id: newArray[index].id,
                  phone: value,
                  userId: newArray[index].userId
                }
                newArray[index] = teste
                setMagic({
                    name: '',
                    value:''
                })
                setMyModalTelephoneState(newArray)
              } 

              const deleteTelephone = async (id, index) => {

                API.delete(`telephone/${id}`)
                  .then(res => {

                    let newArray = myModalTelephoneState
                    newArray.splice(index, 1)
                    setMyModalTelephoneState(newArray)

                    setMagic({
                      name: '',
                      value:''
                    })
                    toast.addNewToast({mensage: 'Telefone deletado com sucesso', myType: 'success'})

                    SaveTelephoneLoca()
                  })
                  .catch(err => {
                    toast.addNewToast({mensage: 'Erro ao deletar telefone!', myType: 'error'})
                    console.log(err.response)
                  })
              }

              return(
                <div key={key} >
                  <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textDetails}>
                    Telefone {key + 1}:
                  </Typography>
                  <ContainerInputEditTelephone> 
                    <MyInput value={cur.phone} onChange={(e) => changeValue( e.target.value, key)} />
                    <AiOutlineCloseCircle size='40' onClick={() => deleteTelephone(cur.id, key)} />
                  </ContainerInputEditTelephone>
                </div>
              )
            })
          }
          <ContainerUploadButton>
            <MyButton myFunction={() => EditTelephone()} >
              <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textPrimary}>
                Salvar
              </Typography>
            </MyButton>
          </ContainerUploadButton>

          </div>
        </Modal>
      ) : (
        null
      )
    }
    {
      myModalNewTelephone ? (
        <Modal title={'Editar Perfil'} open={myModalNewTelephone} setOpenModal={setMyModalNewTelephone}  typeModal='input'>
          <div style={{padding: '20px', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >

            <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textDetails}>
              Novo Telefone:
            </Typography>
            <ContainerInputEditTelephone> 
              <MyInput value={myModalNewTelephoneState} onChange={(e) => setMyModalNewTelephoneState(e.target.value)} />
            </ContainerInputEditTelephone>

            <ContainerUploadButton>
              <MyButton myFunction={() => NewTelphone()} >
                <Typography type={Types.body} size={HeadingSize.heading6} color={NeutralColors.textPrimary}>
                  Salvar
                </Typography>
              </MyButton>
            </ContainerUploadButton>
          </div>
        </Modal>
      ) : (
        null
      )
    }
  </>
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
  min-height: 120px;
  height: auto;
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 25px;

  @media (max-width: 800px){
    > div {
      margin-bottom: 20px;
    }
  }
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

const ImageTypeDoc = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 300px;
  > svg {
    margin-right: 10px;
  }
`
const ContainerDeletButton = styled.div`
  > svg {
    color: #7E7E7E;
    transition: all 0.5s ease;
    cursor: pointer;
  }

  > svg:hover {
    color: #123B6E;
  }
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

const ContainerLogValidade = styled.div`

  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;

  >p {
    margin-right: 10px;
  }

  &:hover > p {
    color: blue !important;
    font-weight: 600
  }

  &:hover > svg {
    color: blue !important;
    font-weight: 600
  }
`


const ContainerInputEditTelephone = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  align-items: center;
  justify-content: center;
  place-items: center;
  margin-bottom: 20px;

  > svg {
    cursor: pointer;
  }
`