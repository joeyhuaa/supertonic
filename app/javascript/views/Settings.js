import React from 'react'
import { useStore } from '../store'
import { THEME } from '../aesthetics'
import { useChangeTheme } from '../hooks/app'

export default function Settings() {
  let setTheme = useChangeTheme()
  const { theme } = useStore.getState()

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