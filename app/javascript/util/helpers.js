export const getUrlEndpoint = () => {
  let url = window.location.href
  let urlContents = url.split('/')
  let last = urlContents[urlContents.length - 1]
  return last
}