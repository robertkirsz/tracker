import React, { useState } from 'react'
import styled from 'styled-components'

import type { Data } from './database'

import Modal from './Modal'

type Props = {
  database: Data
}

export default function DataPreview({ database }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModal() {
    setIsModalVisible(state => !state)
  }

  return (
    <>
      <button onClick={toggleModal}>Show data</button>

      {isModalVisible && (
        <Modal columnTop overflow="auto" onClose={setIsModalVisible}>
          <Pre>{JSON.stringify(database, null, 2)}</Pre>
          <button onClick={toggleModal}>Close</button>
        </Modal>
      )}
    </>
  )
}

const Pre = styled.pre`
  flex: 1;
  margin: 0;
  font-size: 10px;
  overflow: auto;

  + button {
    align-self: center;
  }
`
