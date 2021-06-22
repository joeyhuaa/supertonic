// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  // get data from backend
  let div = document.getElementById('user')
   
  if (div) {
    let user = JSON.parse(div.getAttribute('data'))

    // attach root div to DOM
    let elem = document.createElement('div')
    elem.setAttribute('id', 'app-container')

    ReactDOM.render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App user={user} />
        </BrowserRouter>
      </QueryClientProvider>,
      document.body.appendChild(elem),
    )
  }
})
