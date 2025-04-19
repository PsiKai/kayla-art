import React, { useCallback, useLayoutEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import NavbarPlaceholder from "../components/layout/NavbarPlaceholder"

function Login() {
  const navigate = useNavigate()
  const [cookies] = useCookies(["connect.sid"])
  const [form, setForm] = React.useState({ email: "", password: "" })

  useLayoutEffect(() => {
    if (cookies["connect.sid"]) {
      void navigate("/admin")
    }
  }, [cookies, navigate])

  const updateForm = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prevForm => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }))
  }, [])

  const handleLogin = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()
      console.log("Logging in...")
      const res = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.ok) {
        console.log("Login successful!")
      } else {
        console.error("Login failed!")
      }
    },
    [form],
  )

  return (
    <>
      <NavbarPlaceholder />
      <div>
        <h1>Login</h1>
        <form onSubmit={e => void handleLogin(e)}>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="Email" name="email" onChange={updateForm} />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" name="password" onChange={updateForm} />
          </fieldset>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
