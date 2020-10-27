import remark from 'remark'
import remark2react from 'remark-react'

export default function markdownToHtml(markdown) {
  const processed = remark().use(remark2react).processSync(markdown)
  return processed.result
}