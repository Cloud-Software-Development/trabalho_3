import React from 'react'

interface MyHeaderProps {
  title?: string
}

export default function MyHeader({title} : MyHeaderProps) {
  return (
    <header>
      
      <title> {title} </title>        
      <link rel="shortcut icon" href='/logo2.png' />
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" type='text/css'/>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" type='text/css'/>
      
      <meta name="description" content="Validamos seu documento em segundos!"></meta>
      <meta name="keywords" content="Documentos, Validação"></meta>
        

      <meta property="og:type" content="website"></meta>
      <meta property="og:locale" content="pt_BR"></meta>
      <meta property="og:url" content="https://docsignUFC.com.br/"></meta>
      <meta property="og:title" content="DocSign"></meta>
      <meta property="og:site_name" content="DocSign"></meta>
      <meta property="og:description" content="Validamos seu documento em segundos!"></meta>
      <meta property="og:image" content='/logo2.png'></meta>
      <meta property="og:image:type" content="image/jpeg"></meta>
      <meta property="og:image:width" content="800"></meta>
      <meta property="og:image:height" content="600"></meta>

    </header>
  )
}
