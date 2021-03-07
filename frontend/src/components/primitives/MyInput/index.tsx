import React from "react"
import styled from "styled-components"

interface MyInput extends  React.BaseHTMLAttributes<HTMLInputElement>{
    textplaceholder?: string,
}

function MyInput({textplaceholder = '', ...props}) {
    return (
        <InputComponent placeholder={textplaceholder} {...props} />
    )
}

const InputComponent = styled.input`
    background: #0f37690a;
    border: 1px solid #123B6E;
    border-radius: 6px;
    padding: 14px 16px;
    font-size: 15px;
    outline: none;
    width: 100%;

    &:focus {
        border: 1px solid #123B6E;
    }
`

export default MyInput