import { useCallback, useEffect, useMemo, useRef } from "react"

type DropzoneProps = {
  handleValidDrop: React.DragEventHandler
  handleInvalidDrop: React.DragEventHandler
  accept?: string[]
  className?: string
  children: React.ReactNode | React.ReactNode[] | null
}

export default function Dropzone(props: DropzoneProps) {
  const { handleValidDrop, handleInvalidDrop, accept = ["image/*"], children, className } = props

  const validDrag = useRef(false)

  const typeMatch = useMemo(() => new RegExp("^" + accept.join("|")), [accept])

  useEffect(() => {
    const noEffectAllowed = (e: DragEvent) => {
      e.preventDefault()
      if (e.dataTransfer) e.dataTransfer.effectAllowed = "none"
    }

    document.addEventListener("dragover", noEffectAllowed)
    document.addEventListener("drop", noEffectAllowed)

    return () => {
      document.removeEventListener("dragover", noEffectAllowed)
      document.removeEventListener("drop", noEffectAllowed)
    }
  }, [])

  const setDragClasses = useCallback((e: React.DragEvent, value: boolean) => {
    validDrag.current = value
    e.currentTarget.classList.toggle("is-dragged-over", value)
  }, [])

  const filterNonMatchingFiles = useCallback(
    (e: React.DragEvent) => {
      const { items } = e.dataTransfer
      const files = Array.from(items).filter(({ type }) => type.match(typeMatch))
      const dt = new DataTransfer()
      files.forEach(file => dt.items.add(file.getAsFile()!))
      e.dataTransfer = dt
    },
    [typeMatch],
  )

  const isInsideContainer = useCallback((e: React.DragEvent) => {
    const { top, bottom, left, right } = e.currentTarget.getBoundingClientRect()
    return e.clientX < right && e.clientX > left && e.clientY > top && e.clientY < bottom
  }, [])

  const isValidDragData = useCallback(
    (e: React.DragEvent) => {
      const { items } = e.dataTransfer
      const files = Array.from(items)
      return files.some(({ type }) => type.match(typeMatch))
    },
    [typeMatch],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragClasses(e, false)

      filterNonMatchingFiles(e)
      if (e.dataTransfer.items.length) handleValidDrop(e)
      else handleInvalidDrop(e)
    },
    [handleValidDrop, handleInvalidDrop, filterNonMatchingFiles, setDragClasses],
  )

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (e.currentTarget.contains(e.relatedTarget as Node)) return

      if (isValidDragData(e)) {
        e.dataTransfer.effectAllowed = "copy"
        setDragClasses(e, true)
      } else {
        e.dataTransfer.effectAllowed = "none"
        setDragClasses(e, false)
      }
    },
    [isValidDragData, setDragClasses],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = validDrag.current ? "copy" : "none"
  }, [])

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      if (isInsideContainer(e)) return
      setDragClasses(e, false)
    },
    [isInsideContainer, setDragClasses],
  )

  const handleDragEnd = useCallback(
    (e: React.DragEvent) => setDragClasses(e, false),
    [setDragClasses],
  )

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={className}
    >
      {children}
    </div>
  )
}
