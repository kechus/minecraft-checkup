const FileInfo = () => {
  return (
    <div>
      <p>
        The file you are looking for is inside the <span className="code-like">advancements</span> folder,
        located inside your world save folder, there should only be one file there with a <span className="code-like">.json</span> extension
      </p>
      <div>
        The advancements folder is by default located at
        <p>
          <div>
            Windows: <span className="code-like">%appdata%/.minecraft/saves</span>
          </div>
          <div>
            Mac OS:  <span className="code-like">~/Library/Application Support/minecraft/saves</span>
          </div>
        </p>
      </div>
    </div>
  );
}

export default FileInfo;