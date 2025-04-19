import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import "prismjs/components/prism-javascript"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum(){
    return 1 + 1
  }`)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      console.log(response.data)
    } catch (err) {
      console.error("Error reviewing code:", err)
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              border: "1px solid #dd",
              borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}
          />
        </div>
        <div 
          onClick={reviewCode}
          className="review"
          style={{ cursor: 'pointer', padding: '10px', background: '#333', color: '#fff', textAlign: 'center' }}
        >
          Review Code
        </div>
      </div>
      <div className="right"></div>
    </main>
  )
}

export default App
