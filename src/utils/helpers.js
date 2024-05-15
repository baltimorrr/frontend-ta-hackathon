export const removeEmptyKeysFromObject = (optional = {}) => {
  if (!Object.keys(optional).length) return {}

  return Object.keys(optional).reduce((acc, cur) => {
    if (!optional[cur]) return acc

    return {
      ...acc,
      [cur]: optional[cur],
    }
  })
}
// tai sao lai dung reduce thay vi for

export const getFileData = (file, index) => {
  if (typeof file === 'string') {
    return {
      key: index ? `${file}-${index}` : file,
      preview: file,
    }
  }

  return {
    key: index ? `${file.name}-${index}` : file.name,
    name: file.name,
    size: file.size,
    path: file.path,
    type: file.type,
    preview: file.preview,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
  }
}
