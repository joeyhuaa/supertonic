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
  console.log(duration)
}