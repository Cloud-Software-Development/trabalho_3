import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components'

interface TypographyProps extends React.BaseHTMLAttributes<HTMLParagraphElement>{
  children?: React.ReactChild | React.ReactChild[],
  type?: string,
  size?: string,
  color?: string,
}

interface StyleProps {
  fontFamily: string,
  fontsize: string,
  fontColor: string,
}

function Typography({ children, type='Roboto', size='20px', color='black' ,...props }: TypographyProps) {
  return (
    <Text fontFamily={type} fontsize={size} fontColor={color} {...props}>
      {children}
    </Text>
  );
}

Typography.propTypes = {
  children: PropTypes.node.isRequired,
}

const Text = styled.p<StyleProps>`
  outline: 0;
  width: auto;
  height: auto;

  ${(props) =>
    props.fontFamily &&
    css`
          font-family: ${props.fontFamily};
  `}

  ${(props) =>
    props.fontsize &&
    css`
          font-size: ${props.fontsize};
  `}

  ${(props) =>
    props.fontColor &&
    css`
          color: ${props.fontColor};
  `}

`

export const Types = {
  title: 'Open Sans',
  body: 'Roboto'
}

export const HeadingSize = {
  heading1: '3rem',
  heading2: '2.25rem',
  heading3: '1.875rem',
  heading4: '1.75rem',
  heading5: '1.5rem',
  heading6: '1.25rem',
  heading7: '1.125rem'
}

export const ButtonSize = {
  button1: '1.5rem',
  button2: '1.125rem'
}

export const CaptionSize = {
  caption1: '1.5rem'
}

export default Typography;