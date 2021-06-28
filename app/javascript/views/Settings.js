import React, { useContext } from 'react'
import Context from '../components/Context'
import { THEME } from '../aesthetics'
import useChangeTheme from '../hooks/useChangeTheme'

export default function Settings() {
  let setTheme = useChangeTheme()
  let { theme } = useContext(Context)

  let changeTheme = (value) => {
    setTheme.mutate({
      theme: value
    })
  }

  return (
    <section>
      <h1>Settings</h1>
      <h3>Theme</h3>
      <select onChange={e => changeTheme(e.target.value)}>
        {Object.keys(THEME).map(t => (
          <option selected={theme === t}>{t}</option>
        ))}
      </select>
      <p>
        <a href='/users/sign_out'>Sign Out</a>
      </p>
    </section>
  )
}