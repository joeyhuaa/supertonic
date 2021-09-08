export const getUrlEndpoint = () => {
  let url = window.location.href
  let urlContents = url.split('/')
  let last = urlContents[urlContents.length - 1]
  return last
}

export const audioDuration = async audioFile => {
  function readFile(file) {
    const audio = document.createElement('audio')
    const reader = new FileReader()
    return new Promise(resolve => {
      reader.onload = (e) => {
        let song = e.target.result;
        audio.src = song;
        audio.addEventListener('loadedmetadata', () => {
          console.log('duration:', audio.duration, ' seconds')
          resolve(audio.duration)
        })
      }
      reader.readAsDataURL(file);
    })
  }

  const duration = await readFile(audioFile)
}