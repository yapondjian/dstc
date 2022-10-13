import React, { useEffect, useState } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Modal } from 'vtex.styleguide'

export const NEWSLETTER_MODAL_LOCALSTORAGE_KEY = 'modal-newsletter'

export default function CustomModalNewsletter() {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    const localstorageKey = localStorage.getItem(
      NEWSLETTER_MODAL_LOCALSTORAGE_KEY
    )

    if (!localstorageKey) {
      setTimeout(() => {
        setOpen(true)
      }, 5000)
    }
  }, [])

  function onClose() {
    localStorage.setItem(NEWSLETTER_MODAL_LOCALSTORAGE_KEY, 'true')
    setOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      showCloseIcon
      closeOnEsc
      centered
      onClose={() => onClose()}
    >
      <div>
        <ExtensionPoint id="flex-layout.row" />
      </div>
    </Modal>
  )
}
