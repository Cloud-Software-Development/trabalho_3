import React, { useState } from 'react'
import styled, { css } from 'styled-components'

// Foundation
import Typography, { Types, ButtonSize, HeadingSize, CaptionSize } from '../../foudation/Typography'
import MainColors, { NeutralColors } from '../../foudation/Colors'
import Spaces from '../../foudation/Spaces'
import Shadows from '../../foudation/Shadows'

interface MyButtonProps  extends React.BaseHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactChild | React.ReactChild[],
  myFunction?: any,
  leftIcon?: any,
}

export default function MyButton({ children, myFunction, leftIcon, ...props } : MyButtonProps) {


  const [wavePosition, setWavePosition] = useState({top: 0, left: 0, scale: 0, opacity: 0})

  const [view, setView] = useState()

  async function AnimateWave(event : any){
 

    const button = event.target

    // Get position values 
    const positionButton = button.getBoundingClientRect()
    const top = Math.abs(positionButton.top - event.clientY)
    const left = Math.abs(positionButton.left - event.clientX)
    const scale = Math.min(positionButton.height, positionButton.width)

    setWavePosition({ 
      top:  top,
      left: left,
      scale: scale,
      opacity: 1
    })
    
    setTimeout(()=> {
      setWavePosition({ 
        top: top,
        left: left,
        scale: scale,
        opacity: 0
      })
    }, 400)
    setTimeout(()=> {
      setWavePosition({ 
        top: top,
        left: left,
        scale: 0,
        opacity: 0
      })
    }, 600)
  }


  function CallFunction(event :any){
    
    AnimateWave(event)
    
    myFunction && myFunction()
    
  }

  return (
    <Container onClick={event => CallFunction(event) }  style={{ backgroundColor: MainColors.primary, color: NeutralColors.textDetails, boxShadow: Shadows.shadow2 }} {...props}>
      {leftIcon}
      {children}
      <Wave position={wavePosition}/>
    </Container>
  )
}

interface WaveProps {
  position: { 
    top: number,
    left: number,
    scale: number,
    opacity: number,
  }
}

const Container = styled.button`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: 0.5s ease all;
  &:hover {
    box-shadow: 0px 3px 6px rgba(52, 60, 88, 0.5) !important
  }
  > svg {
    margin-right: 10px;
  }
`

const Wave = styled.span<WaveProps>`
  pointer-events: none;
	width: 1px;
  height: 1px;
	background: transparent;
  display: block;
  /* Reset de posições */
	position: absolute;
	top: 0;
  left: 0;
  /* Importantes */
  will-change: transform;
  transform: translateX(var(--left)) translateY(var(--top));

  ${(props) =>
    props.position &&
    css`
          top: ${`${props.position.top}px`};
          left: ${`${props.position.left}px`};
          --scale: ${props.position.scale};
          --opacity: ${props.position.opacity};
  `}

  &:after {
    content: "";
    display: block;
    width: 100%;
    border-radius: 50%;
    width: 2px;
    height: 2px;
    background: rgba(255,255,255,.2);
    /* Importantes */
    will-change: transform;
    transform: scale(var(--scale));
    opacity: var(--opacity);
    transition: transform 0.6s, opacity .3s;
  }
`