import React, { useState } from 'react'

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
      <button className="btn" onClick={toggleModal}>
        Show data
      </button>

      <Modal
        show={isModalVisible}
        className="overflow-auto space-y-4"
        onClose={toggleModal}
        data-e2e="database-preview-modal"
      >
        <pre className="flex-1 text-xs overflow-auto">{JSON.stringify(database, null, 2)}</pre>
        <button className="btn self-center" onClick={toggleModal}>
          Close
        </button>
      </Modal>
    </>
  )
}
