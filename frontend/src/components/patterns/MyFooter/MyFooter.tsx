import React from 'react'
import styled, {css} from 'styled-components'

// Foundation
import Typography, { Types, ButtonSize, HeadingSize, CaptionSize } from '../../foudation/Typography'
import MainColors, { NeutralColors } from '../../foudation/Colors'
import Spaces from '../../foudation/Spaces'
import Shadows from '../../foudation/Shadows'

// Icons
import { FiMail, FiPhone, FiInstagram, FiFacebook } from 'react-icons/fi'

export default function MyFooter() {

  const myLinks = (child : any, text : string) => {

    return(
      <LinkContent>
        {child}
        <Typography type={Types.title} color={NeutralColors.textDetails} >
          {text}
        </Typography>
      </LinkContent>
    )
  }

  return (
    <footer>
      <Container bgColor={MainColors.secondary} >
        <Content spaces={Spaces}>
          
          <img src={"Logo.png"} alt="logo"/>

          {myLinks(
            <FiMail size='22' color='white' />,
            'docsign@email.com'
          )}
          {myLinks(
            <FiInstagram  size='22' color='white' />,
            '@doc.sign'
          )}
          {myLinks(
            <FiFacebook  size='22' color='white'  />,
            'facebook.com/docsign'
          )}

        </Content>
      </Container>
    </footer>
  )
}


interface ContainerProps {
  bgColor?: string,
}

interface ContentProps {
  spaces?: {
    horizontalSpacesSite1: string,
    horizontalSpacesSite2: string,
  },
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
  ${(props) =>
    props.bgColor &&
    css`
      background-color: ${props.bgColor};
    `}
`

const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  min-height: 9.2vw;

  > img {
    width: 162px;
    height: 30px;
  }

  @media(max-width: 900px){
    flex-direction: column;
    padding-top: 15px !important;
  }

  ${(props) =>
    props.spaces &&
    css`
      padding: 0 ${props.spaces.horizontalSpacesSite1};
    `}

  @media(max-width: 1200px){
    ${(props) =>
      props.spaces &&
      css`
        padding: 0 ${props.spaces.horizontalSpacesSite2};
      `}
  }

`

const LinkContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 240px;
  cursor: pointer;

  @media(max-width: 900px){
    margin: 15px 0;
  }



  > svg {
    margin-right: 10px
  }

  &:hover {
    > p {
      text-decoration: underline;
    }
  }

`