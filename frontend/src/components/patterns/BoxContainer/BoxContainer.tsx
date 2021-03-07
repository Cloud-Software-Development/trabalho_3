import React from 'react'
import styled from 'styled-components'

interface BoxContainerProps {
  children: JSX.Element[] | JSX.Element,
}

export default function BoxContainer( {children}: BoxContainerProps ) {
  return (
    <Container>
      { children }
    </Container>
  )
}

const Container = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 25px;
  height: 100%;
  width: 100%;
`
