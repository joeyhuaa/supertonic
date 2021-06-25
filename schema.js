// data structure

let data = {
  user: {
    id: 1,
    name: 'JPortgas',
    email: 'joeyportgas@gmail.com',
    projects: [
      {
        id: 1,
        name: 'songs',
        description: 'some songs i made',
        songs: [
          {
            id: 1,
            name: 'flow state',
            b64: 'data:audio/mpeg...',
          },
          {
            id: 2,
            name: 'planeswalker',
            b64: 'data:audio/mpeg...',
          },
          {
            id: 3,
            name: 'wholehearted',
            b64: 'data:audio/mpeg...',
          }
        ],
        branches: {
          main: [1,2,3], // song ids
          mixes: [1,2,3],
          masters: [1,2,3]
        }
      }
    ]
  }
}