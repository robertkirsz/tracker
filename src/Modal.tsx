import React from 'react'
import styled from 'styled-components'

import Div, { DivProps } from './Div'

type Props = {
  onClose: Function
  children: React.ReactNode
}

export default function Modal({ onClose, ...props }: Props & DivProps) {
  function handleBackgroundClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <Background onClick={handleBackgroundClick}>
      <Content {...props} />
    </Background>
  )
}

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 16px;
  background: rgba(0, 0, 0, 0.75);

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
`

const Content = styled(Div)`
  max-width: 100%;
  max-height: 100%;
  padding: 8px;

  background: #eee;
  border-radius: 8px;

  color: black;
`
