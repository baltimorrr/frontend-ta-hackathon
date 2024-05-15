import axiosInstance from './axios'

// https://stackoverflow.com/questions/11415665/save-base64-string-as-pdf-at-client-side-with-javascript
export const base64toBlob = (data) => {
  const sliceSize = 32
  data = data.replace(/^[^,]+,/, '')
  data = data.replace(/\s/g, '')
  const byteCharacters = window.atob(data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)

    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
}

const handleDownloadFileByBlob = (url, response) => {
  const anchor = document.createElement('a')
  const filename =
    response?.headers?.['content-disposition']?.split('filename=')[1] ||
    url.substring(url.lastIndexOf('/') + 1)
  const objectUrl = window.URL.createObjectURL(response?.data) // xem lai

  document.body.appendChild(anchor)

  anchor.href = objectUrl
  anchor.target = '_blank'
  anchor.download = filename

  anchor.click()
  anchor.remove()

  window.URL.revokeObjectURL(objectUrl)
}

export const downloadPdfFile = async (url) => {
  try {
    if (!url) throw new Error(`Pdf file url isn't existed!`)

    axiosInstance
      .get(url, {
        responseType: 'blob',
      })
      .then((response) => handleDownloadFileByBlob(url, response))
  } catch (error) {
    console.log(error)
  }
}
