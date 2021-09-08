import React from 'react'
import { THEME } from '../aesthetics'
import { useTheme, useChangeTheme } from '../hooks'

export default function Settings() {
  let setTheme = useChangeTheme()
  const theme = useTheme().data

  let changeTheme = (newTheme) => {
    setTheme.mutate({ theme: newTheme })
  }

  return (
    <section>
      {theme && 
        <>
          <h1>Settings</h1>
          <h3>Theme</h3>
          <select 
            onChange={e => changeTheme(e.target.value)}
            defaultValue={theme}
          >
            {Object.keys(THEME).map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <p>
            <a href='/users/sign_out'>Sign Out</a>
          </p>
        </>
      }
    </section>
  )
}