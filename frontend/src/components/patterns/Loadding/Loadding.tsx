import React from 'react'
import styled from 'styled-components'

import Typography, { Types, ButtonSize, HeadingSize, CaptionSize } from '../../foudation/Typography/index'
import MainColors, { NeutralColors }  from '../../foudation/Colors/index'

export default function Loadding() {
  return (
    <Container>
      <Typography type={Types.title} size={HeadingSize.heading2} color={NeutralColors.textDetails}  >
          Carregando...
      </Typography>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
`