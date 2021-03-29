import { useState } from 'react'

import type { ChangeEvent } from 'react'
import type { DatabaseInterface } from 'database'

import { downloadDatabase } from 'database'
import Modal from 'components/Modal'

type Props = {
  database: DatabaseInterface
  onDatabaseUpload: (database: DatabaseInterface) => void
}

export default function DatabasePreview({ database, onDatabaseUpload }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModal() {
    setIsModalVisible(state => !state)
  }

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = event => {
      const result = event.target?.result

      if (typeof result === 'string') {
        onDatabaseUpload(JSON.parse(result))
      }
    }

    reader.readAsText(file)
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
        <button className="btn self-center" onClick={downloadDatabase}>
          Download
        </button>

        <input type="file" onChange={handleUpload} />

        <pre className="flex-1 text-xs overflow-auto">{JSON.stringify(database, null, 2)}</pre>

        <button
          className="btn self-center"
          onClick={toggleModal}
          data-e2e="database-preview-modal close button"
        >
          Close
        </button>
      </Modal>
    </>
  )
}
