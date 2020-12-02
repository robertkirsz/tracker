import React, { useState } from 'react'
import styled from 'styled-components'

import { DatabaseInterface } from 'database'

import Modal from 'components/Modal'

type Props = {
  database: DatabaseInterface
}

export default function DatabasePreview({ database }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModal() {
    setIsModalVisible(state => !state)
  }

  return (
    <>
      <button onClick={toggleModal}>Show data</button>

      {isModalVisible && (
        <Modal columnTop overflow="auto" onClose={toggleModal}>
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
