import React, { useState } from 'react'

import Div from './Div'
import Modal from './Modal'

type Props = {
  onEdit: Function
  onDelete: Function
  onClose: Function
}

export default function EditTimelineModal({ onEdit, onDelete, onClose }: Props) {
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false)

  return (
    <Modal columnTop itemsCenter onClose={onClose} data-testid="delete-timeline-modal">
      <button onClick={() => setIsDeleteConfirmationVisible(true)}>Delete</button>

      {isDeleteConfirmationVisible && (
        <Div columnTop>
          <span>Are you sure?</span>
          <button onClick={() => onDelete()}>Yes</button>
          <button onClick={() => setIsDeleteConfirmationVisible(false)}>No</button>
        </Div>
      )}
    </Modal>
  )
}
