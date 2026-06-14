import React, { useEffect, useState } from 'react'

export default function App() {
  const [files, setFiles] = useState([])
  const [selected, setSelected] = useState(null)
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/api/files')
      .then(r => r.json())
      .then(setFiles)
      .catch(console.error)
  }, [])

  const loadFile = async (name) => {
    const res = await fetch('/api/file?name=' + encodeURIComponent(name))
    const json = await res.json()
    setSelected(name)
    setContent(json.content || json.error)
  }

  return (
    <div style={{ display: 'flex', gap: 20, padding: 20 }}>
      <div style={{ width: 300 }}>
        <h3>Files</h3>
        <ul>
          {files.map(f => (
            <li key={f.name}>
              <button onClick={() => loadFile(f.name)}>{f.name}</button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <h3>{selected || 'Content'}</h3>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f6f6', padding: 10 }}>{content}</pre>
      </div>
    </div>
  )
}
