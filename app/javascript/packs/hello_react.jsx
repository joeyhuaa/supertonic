// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'

document.addEventListener('DOMContentLoaded', () => {
  // get data from backend
  let div = document.getElementById('projects')
  let projects = JSON.parse(div.getAttribute('data'))

  // attach root div to DOM
  let elem = document.createElement('div')
  elem.setAttribute('id', 'app-container')

  ReactDOM.render(
    <App 
      projects={projects}
    />,
    document.body.appendChild(elem),
  )
})
