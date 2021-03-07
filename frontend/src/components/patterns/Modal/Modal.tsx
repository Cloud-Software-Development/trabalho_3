import React, { useState, useEffect, SetStateAction } from 'react'
import styled, { css } from 'styled-components'

// Patterns
import BoxContainer from '../../patterns/BoxContainer/BoxContainer'


// Foudation
import Typography, { Types, ButtonSize, HeadingSize, CaptionSize } from '../../foudation/Typography'
import MainColors, { NeutralColors }  from '../../foudation/Colors'
import Spaces from '../../foudation/Spaces'

// Componentes externos
import { AiFillCloseCircle } from 'react-icons/ai'
import DataTable from 'react-data-table-component'

interface ModalProps {
  children?: React.ReactChild | React.ReactChild[],
  title?: string,
  typeModal?: 'table' | string,
  nameDoc?: string,
  open?: boolean,
  setOpenModal?: any,
  data?: any,
}

export default function Modal({ children, title='Nome do Modal', typeModal='table', nameDoc='Nome do Doc', open=true, setOpenModal, data=[{data: '12/01/2020', motivation: 'Um grande motivo' }] }: ModalProps) {


  function DataTime(row: any){
    return(
      <Typography type={Types.body} color={NeutralColors.textDetails} size={HeadingSize.heading7}  >
        {new Date(row.timestamp).toLocaleDateString()}
      </Typography>
    )
  }

  const columnsDoc = [
    {
      name: 'Data',
      selector: 'timestamp',
      sortable: true,
      maxWidth: '400px',
      cell: (row: any, index: any, column: any, id: any) => DataTime(row)
    },
    {
      name: 'Motivação',
      selector: 'motivation',
      wrap: true,
      sortable: true,
    },
  ];

  const element = [
    {
      data: '12/09/12',
      motivation: 'Um motivo qualquer para validar documento'
    },
    {
      data: '13/10/20',
      motivation: 'Outro motivo qualquer para validar documento'
    }
  ]

  function CloseModal(event : any){
    let modal = document.getElementById("modal");

    if (!modal?.contains(event?.target)) {
      setOpenModal(false)
    }

  }

  if(open){
    return (
      <Overlay id='overlay' onClick={(e: any)=> CloseModal(e)} >
        <Container id='modal'  >
          <BoxContainer>

            <Header>
              <Typography>
                {title}
              </Typography>
              <AiFillCloseCircle size='40' color='black' onClick={() => setOpenModal(false)} />
            </Header>

            <Content>
              {
                typeModal === 'table' ?                 
                  element.length !== 0 ? (
                    <DataTable
                      title={nameDoc}
                      columns={columnsDoc}
                      data={data}
                      customStyles={customStyles}
                    />
                  ) : (
                    <p> Nenhum Log </p>
                  )
                : (
                  null
                )
              }
              {children}
            </Content>


          </BoxContainer>
        </Container>
      </Overlay>
    )
  }else {
    return (
      <></>
    )
  }
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

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #00000082;
  z-index: 9;
  top: 0;
  left: 0;
`

const Container = styled.div`
  max-width: 450px;
  width: 100%;
  height: 400px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 0 20px;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;

  > svg {
    cursor: pointer;
  }
`

const Content = styled.div`
  overflow: auto;
  max-height: 320px;
`