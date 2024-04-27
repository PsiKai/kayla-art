import { FormEvent } from "react"

function Contact() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(e.target)
  }

  return (
    <div>
      <h1>Contact me</h1>
      <p>Reach out to me on my socials or email me directly here</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Contact
