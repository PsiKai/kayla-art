import React, { useEffect, useRef } from "react"

export type TModalProps = {
  open: boolean
  handleExit: () => void
  children?: React.ReactNode
}

export function Modal({ open, handleExit, children }: TModalProps) {
  const modalRef = useRef({}) as React.MutableRefObject<HTMLDialogElement>

  useEffect(() => {
    if (!modalRef.current) return

    if (open && modalRef.current.open === false) {
      modalRef.current.showModal()
    } else if (open === false && modalRef.current.open === true) {
      modalRef.current.close()
    }
  }, [open])

  if (!open) return null

  return (
    <dialog
      ref={node => {
        if (node) modalRef.current = node
      }}
      onClose={handleExit}
    >
      {children}
    </dialog>
  )
}
