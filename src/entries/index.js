'use strict'

import '../index.css'

// Redux
import { createStore } from 'redux'

const form = document.getElementById('form')
const container = document.getElementById('playlist')

form.addEventListener('submit', handleSubmit)

function handleSubmit (event) {
  event.preventDefault()

  const data = new FormData(form)

  const title = data.get('title')

  console.log(title)

  // ACTIONS -> REDUCERS
  store.dispatch({
    // A good practice is to use a "constant" string in uppercase
    type: 'ADD_SONG',
    // A good practice is to send an object on the payload
    payload: {
      title
    }
  })
}

// Store
// const store = createStore(
//   reducer -> It is a pure function,
//   initialState,
//   enhancer -> It is an optional parameter
// )

// STATE -> UI
const initialState = [
  {
    title: 'I Can Only Imagine',
    author: 'MercyMe'
  },
  {
    title: 'How Great is Our God',
    author: 'Chris Tomlin'
  },
  {
    title: 'Sueño de Morir',
    author: 'Alex Campos'
  }
]

// REDUCER -> STORE
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SONG':
      // Load all the songs in the state and add one more
      // Following good practices, the { payload } is an object
      return [...state, action.payload]
    default:
      return state
  }
}

// STORE -> STATE
const store = createStore(
  reducer,
  initialState,
  // Use only in development
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// UI -> ACTIONS
function render () {
  // HTML
  container.innerHTML = ''

  const playlist = store.getState()

  playlist.forEach(song => {
    // Create an html element
    const template = document.createElement('p')
    template.textContent = song.title

    // Add to html
    container.appendChild(template)
  })
}

render()

function handleChange () {
  render()
}

// UPDATE UI
store.subscribe(handleChange)
