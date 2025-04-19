import { FormEvent, useCallback } from "react"
import "../styles/form.css"
import NavbarPlaceholder from "../components/layout/NavbarPlaceholder"

function Contact() {
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    console.log(e.target)
  }, [])

  return (
    <>
      <NavbarPlaceholder />
      <div className="form-data">
        <h1>Contact me</h1>
        <p>Reach out to me on my socials or email me directly here</p>
        <form onSubmit={handleSubmit} className="contact-form form">
          <div className="form-field">
            <label htmlFor="name">
              <p>Name</p>
            </label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-field">
            <label htmlFor="email">
              <p>Email or Phone</p>
            </label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-field">
            <label htmlFor="message">
              <p>Message</p>
            </label>
            <textarea id="message" name="message" rows={5} />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Contact
