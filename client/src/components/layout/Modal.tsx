import { useEffect, useRef } from "react"

export type TModalProps = {
  open: boolean
  handleExit: () => void
  children?: React.ReactNode
}

export function Modal({ open, handleExit, children }: TModalProps) {
  const modalRef = useRef() as React.MutableRefObject<HTMLDialogElement>

  useEffect(() => {
    if (open && modalRef.current?.open === false) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [open])

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
