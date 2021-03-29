import { useState } from 'react'
import styled from 'styled-components'

import type { ChangeEvent } from 'react'
import type { DatabaseInterface } from 'database'

import { downloadDatabase } from 'database'
import Div from 'components/Div'
import Modal from 'components/Modal'

type Props = {
  database: DatabaseInterface
  onDatabaseUpload: (database: DatabaseInterface) => void
}

export default function DatabasePreview({ database, onDatabaseUpload }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModal() {
    if (!isUploading) setIsModalVisible(state => !state)
  }

  const [isUploading, setIsUploading] = useState(false)

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = event => {
      const result = event.target?.result

      if (typeof result === 'string') {
        onDatabaseUpload(JSON.parse(result))
        setIsUploading(false)
      }
    }

    setIsUploading(true)
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
        <Div listLeft selfCenter flexNone>
          <button className="btn" disabled={isUploading} onClick={downloadDatabase}>
            Download
          </button>

          <UploadButton className="btn" htmlFor="files" disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
            <input id="files" type="file" onChange={handleUpload} disabled={isUploading} />
          </UploadButton>
        </Div>

        <pre className="flex-1 text-xs overflow-auto">{JSON.stringify(database, null, 2)}</pre>

        <button
          className="btn self-center"
          disabled={isUploading}
          onClick={toggleModal}
          data-e2e="database-preview-modal close button"
        >
          Close
        </button>
      </Modal>
    </>
  )
}

const UploadButton = styled.label<{ disabled: boolean }>`
  cursor: pointer;

  input {
    display: none;
  }

  ${({ disabled }) => disabled && `opacity: 0.5; cursor: not-allowed;`}
`
