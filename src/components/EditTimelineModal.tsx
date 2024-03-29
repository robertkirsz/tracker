import React, { useState } from 'react'

import Div from 'components/Div'
import Modal from 'components/Modal'

type Props = {
  show: boolean
  onEdit: Function
  onDelete: Function
  onClose: Function
}

export default function EditTimelineModal({ show, onEdit, onDelete, onClose }: Props) {
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false)

  return (
    <Modal
      show={show}
      className="flex-col space-y-4 items-center"
      onClose={onClose}
      data-testid="delete-timeline-modal"
    >
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
