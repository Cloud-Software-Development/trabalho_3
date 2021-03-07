import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

// Patterns
import BoxContainer from '../../components/patterns/BoxContainer/BoxContainer'
import Toast from '../../components/patterns/Toast'

// Foundation
import Typography, { Types, ButtonSize, HeadingSize, CaptionSize } from '../../components/foudation/Typography'
import MainColors, { NeutralColors }  from '../../components/foudation/Colors'
import Spaces from '../../components/foudation/Spaces'


// Primitives
import MyButton from '../../components/primitives/Button'
import MyInput from '../../components/primitives/MyInput'

// Componentes externos
import {useDropzone} from 'react-dropzone';
import { AiOutlineFileImage, AiOutlineFilePdf } from 'react-icons/ai'
import { FiFile } from 'react-icons/fi'
import API from '../../utils/api'

export default function PublicHome() {

  const [motivation, setMotivation] = useState<any>('')
  const [documentValidationId, setDocumentValidationId] = useState<any>('')
  const [previewImages, setPreviewImages] = useState<any>([])
  const [validateDocument, setValidateDocument] = useState<any>([])
  
  const toast = Toast()

  // Tipos de aruqivos aceitos
  const typeFiles = ['image/jpeg', 'application/pdf', 'image/png', 'text/plain', 'application/msword']

  // Inincia o DropZone
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setPreviewImages(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  // Apresenta um preview das imagens ou pdf
  const myImagesPreview = previewImages.map(file => {
    const intType = typeFiles.indexOf(file.type)

    switch (intType) {
      case 0:
        return (
          <ImageDropZonePreview key={file.preview}>
            <img
              src={file.preview}
              style={{width: '150px', height: '150px', objectFit: 'cover'}}
            />
            <span> {file.path} </span>
          </ImageDropZonePreview>
        )
      case 1:
        return (
          <ImageDropZonePreview key={file.preview}>
            <FiFile  size='150' color='black' />
            <span> {file.path} </span>
          </ImageDropZonePreview>
        )
      case 2:
        return (
          <ImageDropZonePreview key={file.preview}>
            <img
              src={file.preview}
              style={{width: '150px', height: '150px', objectFit: 'cover'}}
            />
            <span> {file.path} </span>
          </ImageDropZonePreview>
        )
      case 3:
        return (
          <ImageDropZonePreview key={file.preview}>
            <FiFile  size='150' color='black' />
            <span> {file.path} </span>
          </ImageDropZonePreview>
        )
      case 4:
        return (
          <ImageDropZonePreview key={file.preview}>
            <FiFile  size='150' color='black' />
            <span> {file.path} </span>
          </ImageDropZonePreview>
        )
      default:
        break;
    }
  });

  // Enviar documentos para a analize
  async function SubmitImages() {

    setValidateDocument([])


    if(motivation === undefined || motivation === '' || documentValidationId === '' || acceptedFiles.length === 0){

      toast.addNewToast({mensage: 'Preencha os campos vazios', myType: 'error'})
      return 
    }

    let newArray: Array<any>

    for (let i = 0; i < acceptedFiles.length; i++) {
      let error = false
      const element = acceptedFiles[i]

      if(typeFiles.indexOf(element.type) === -1) {

        toast.addNewToast({mensage: `Tipo de arquivo inválido: ${element.type}`, myType: 'error'})
        error = true
      }

      if(!error){
        const formFile = new FormData()
        formFile.append('file', element)
        formFile.append('id', documentValidationId)
        formFile.append('motivation', motivation)
  
        
        API.post(`document/validate/${documentValidationId}`, formFile )
        .then(res => {
            toast.addNewToast({mensage: `Documento ${res.data.valid ? 'válido' : 'inválido'}`, myType: `${res.data.valid ? 'success' : 'warning'}`})
            setValidateDocument([
              {
                file: element,
                validate: res.data.valid
              }
            ])
          })
          .catch(res => {
            console.log(res)
            toast.addNewToast({mensage: 'Erro ao validar documento!', myType: 'error'})
          })
      }
    }
  }

  return (
    <Container space={Spaces} >

      <BoxContainer>
        <Content>

          <ContainerDropZone>

            <Typography type={Types.body} size={CaptionSize.caption1} color={NeutralColors.textDetails}>
              Escolha o seu documento:
            </Typography>

            <ContentDropZone {...getRootProps({isDragActive, isDragAccept, isDragReject}) }>
              <input {...getInputProps()} />

              {
                previewImages.length !== 0 ? (
                  null
                ) : (
                  <p>Selecione ou arraste até 1 arquivo por vez (.pdf, .jpeg, .png, .txt, .doc)</p>
                )
              }
              <ContainerPreviewImages>
                {myImagesPreview}
              </ContainerPreviewImages>

            </ContentDropZone>
            {
              previewImages.length !== 0 ? (

                <ClearButton>
                  <MyButton myFunction={() => setPreviewImages([])} >
                    <Typography type={Types.body} size={CaptionSize.caption1} color={NeutralColors.textPrimary}>
                      Limpar
                    </Typography>
                  </MyButton>
                </ClearButton>

              ) : (
                null
              )
            }
          </ContainerDropZone>

          <ContainerMotivation>
            <Typography type={Types.body} size={CaptionSize.caption1} color={NeutralColors.textDetails} > Id do documento: </Typography> 
            <input value={documentValidationId} onChange={(e) => setDocumentValidationId(e.target.value)} placeholder='Ex: 123456789' />
          </ContainerMotivation>


          <ContainerMotivation>
            <Typography type={Types.body} size={CaptionSize.caption1} color={NeutralColors.textDetails} > Motivação: </Typography> 
            <textarea value={motivation} onChange={(e) => setMotivation(e.target.value)} placeholder='Motivos para validar o documento' />
          </ContainerMotivation>

          <div>

            <SendButton>
              <MyButton myFunction={() => SubmitImages()} >
                <Typography type={Types.body} size={CaptionSize.caption1} color={NeutralColors.textPrimary}>
                  Analisar documento
                </Typography>
              </MyButton>
            </SendButton>

          </div>

          <div style={{marginTop: '25px'}} >

            {
              validateDocument.length !== 0 && 
                validateDocument.map((element) => {

                  const file = element.file

                  const lastModify = new Date(file.lastModifiedDate)
                  const fim = acceptedFiles[0]

                  if(file.type === 'application/pdf'){
                    return (
                      <div key={file.preview} style={{margin:'5px 0'}} >
                        <ConteinerResult >
                          <AiOutlineFilePdf size='150' color='black' />
                          <div style={{maxWidth: '430px'}} >
                            <Typography type={Types.body} size={CaptionSize.caption1} color={NeutralColors.textDetails}>
                              {file.name}
                            </Typography>
                          </div>
                          <Typography>
                            {
                              element.validate ? (
                                'Documento válido'
                              ) : (
                                'Documento inválido'
                              )
                            }
                          </Typography>
                        </ConteinerResult>
                        <hr/>
                      </div>
                    )
                  } else{
                    return (
                      <div key={file.preview} style={{margin:'5px 0'}} >
                        <ConteinerResult >
                          <AiOutlineFileImage  size='150' color='black' />
                          <div style={{maxWidth: '430px'}} >
                            <Typography type={Types.body} size={CaptionSize.caption1} color={NeutralColors.textDetails}>
                              {file.name}
                            </Typography>
                          </div>
                          <Typography>
                            {
                              element.validate ? (
                                'Documento válido'
                              ) : (
                                'Documento inválido'
                              )
                            }
                          </Typography>
                        </ConteinerResult>
                        <hr/>
                      </div>
                    )
                  }
                })
            }
          </div>
          
        </Content>

      </BoxContainer>

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
  height: auto;
  width: 100%;
  padding: 40px 15%;
`

// Dropzone
const ContainerDropZone = styled.div`
  > p {
    margin-bottom: 15px;
  }

  margin-bottom: 25px;
`

const ContentDropZone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 100%;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  position: relative;
  margin-bottom: 15px;
`

const ContainerPreviewImages = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  padding: 15px 15px;
  height: 380px;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`

const ImageDropZonePreview = styled.div`
  margin: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 150px;
  height: 180px;
  overflow: hidden;

  > svg {
    width: 150px;
    height: 150px;
  }
`

// Buttons
const ClearButton = styled.div`
  width: 110px;
  height: 35px;
  > button {
    background-color: rgb(67 113 171) !important;
  }
`

const SendButton = styled.div`
  width: 240px;
  height: 50px;
`

// Motivation
const ContainerMotivation = styled.div`
  margin: 25px 0;

  > p {
    margin-bottom: 5px 
  }

  > textarea{
    margin: 5px 0;
    min-width: 100%;
    max-width: 100%;
    min-height: 120px;
    outline: none;
    padding: 10px;
    font-family: 'Roboto';
    font-size: 1rem;
  }

  > input {
    width: 100%;
    height: 40px;
    outline: none;
    padding-left: 5px;
    font-family: 'Roboto';
    font-size: 1rem;
  }
`

// Result 
const ConteinerResult = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`