import React, { useEffect, useState } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Modal } from 'vtex.styleguide'

const EXIT_MODAL_LOCALSTORAGE_KEY = 'exit-modal'

export default function CustomModalExit() {
  const [showExitPrompt, setShowExitPrompt] = useState(false)

  useEffect(() => {
    document.addEventListener('mouseleave', function (event) {
      const localstorageKey = localStorage.getItem(EXIT_MODAL_LOCALSTORAGE_KEY)

      if (localstorageKey === 'true') {
        return
      }

      if (event.clientY <= 0) {
        setShowExitPrompt(true)
      }
    })

    return () => {
      document.removeEventListener('mouseleave', () => {})
    }
  }, [])

  useEffect(() => {
    if (showExitPrompt) {
      const modalExit = document.getElementsByClassName('vtex-modal__overlay')

      if (modalExit) {
        modalExit.item(0)?.classList.add('vtex_modal-exit')

        setTimeout(() => {
          const items = document.querySelectorAll(
            '.vtex-list-context-0-x-item--modal-exit'
          )

          if (items.length) {
            items.forEach(item => {
              ;(item as HTMLDivElement).onclick = () => {
                localStorage.setItem(EXIT_MODAL_LOCALSTORAGE_KEY, 'true')
                setShowExitPrompt(false)
              }
            })
          }
        }, 1000)
      }
    }
  }, [showExitPrompt])

  return (
    <Modal
      isOpen={showExitPrompt}
      closeOnEsc
      showCloseIcon
      centered
      title={<ExtensionPoint id="rich-text" />}
      onClose={() => {
        setShowExitPrompt(false)
        localStorage.setItem(EXIT_MODAL_LOCALSTORAGE_KEY, 'true')
      }}
    >
      <ExtensionPoint id="flex-layout.row" />
    </Modal>
  )
}
