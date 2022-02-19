import Error from './Error';
import { useState } from 'react';

const FileHandler = (props) => {
  const [showError, setToggleShowError] = useState(false)

  const fileChange = (event) => {
    const file = event.target.files[0]
    if (fileTypeIsJSON(file)) {
      tryParsingFile(file)
    } else {
      showErrorMessage()
    }
  }

  function fileTypeIsJSON(userFile) {
    return userFile.type === 'application/json'
  }

  function showErrorMessage() {
    setToggleShowError(true)
    setTimeout(hideErrorMessage, 3000)
  }

  function hideErrorMessage() {
    setToggleShowError(false)
  }

  function tryParsingFile(userFile) {
    const fileReader = new FileReader()
    fileReader.readAsText(userFile)
    fileReader.onload = () => {
      try {
        const uploadedAdvancements = JSON.parse(fileReader.result)
        props.onFileChange(uploadedAdvancements)
      } catch {
        showErrorMessage()
      }
    }
    fileReader.onerror = () => {
      showErrorMessage()
    }
  }

  function emptyFile() {
    props.onFileChange({})
  }

  return (
    <div>
      <p>
        The file you are looking for is inside the <span className="code-like">advancements</span> folder,
        located inside your world save folder, there should only be one file there with a <span className="code-like">.json</span> extension
      </p>
      <div>
        The advancements folder is by default located at
        <div style={{ marginTop: '1%' }}>
          Windows:
          <div className="code-like">%appdata%/.minecraft/saves</div>
          Mac OS:
          <div className="code-like">~/Library/Application Support/minecraft/saves</div>
        </div>
        <div className='file-reader'>
          <input type="file"
            onChange={fileChange}
            className='input-file'
          />
        </div>
        <button
          onClick={emptyFile}>Test empty file</button>
      </div>
      {showError ? <Error /> : ''}
    </div>
  );
}

export default FileHandler;