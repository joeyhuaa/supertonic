import React, { useContext } from 'react'
import Context from '../components/Context'
import { THEME } from '../aesthetics'
import useChangeTheme from '../hooks/useChangeTheme'
import useTheme from '../hooks/useTheme'

export default function Settings() {
  let setTheme = useChangeTheme()
  const theme = useTheme().data

  let changeTheme = (value) => {
    setTheme.mutate({
      theme: value
    })
  }

  console.log('settings theme:', theme)

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