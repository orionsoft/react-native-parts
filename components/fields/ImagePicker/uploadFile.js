export default async function(uri, uploadURL) {
  let fileType = uri.split('.').reverse()[0]
  let name = uri.split('/').reverse()[0]

  let formData = new FormData()
  formData.append('file', {
    uri,
    name: name,
    type: `image/${fileType}`
  })

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  }

  const response = await fetch(uploadURL, options)
  const url = await response.text()
  return url
}
