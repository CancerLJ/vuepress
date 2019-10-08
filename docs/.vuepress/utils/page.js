export function getDescription(item) {
  let desc = item.title
  if (item.frontmatter.meta) {
    item.frontmatter.meta.forEach(meta => {
      if (meta.name == 'description') {
        desc = meta.content
        return
      }
    })
  }
  return desc
}
