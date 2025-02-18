function Loading() {
  return (
    <div
      role="progressbar"
      style={{
        position: "absolute",
        inset: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--color-background)",
      }}
    >
      Loading...
    </div>
  )
}

export default Loading
