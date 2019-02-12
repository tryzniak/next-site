import classNames from 'classnames'

import Tabs from '../tabs'

export default ({ data, children }) => {
  return (
    <div className="editor">
      <style jsx>{`
        .editor {
          display: flex;
          flex-direction: column;
          background: #0c0c0c;
          border: 1px solid #535353;
          box-shadow: 0 14px 50px 0 rgba(0, 0, 0, 0.38),
            0 2px 10px 0 rgba(0, 0, 0, 0.48);
          border-radius: 7px;
          width: 100%;
          height: 352px;
          overflow: hidden;
        }
        .header {
          display: flex;
          height: 2rem;
          line-height: 2rem;
          text-align: left;
          overflow: hidden;
          background-color: #212121;
        }
        .button-group {
          display: inline-block;
          margin: 0 11px;
        }
        .button {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .button:not(:last-of-type) {
          margin-right: 5px;
        }
        .title {
          display: inline-block;
          flex: 1;
          white-space: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .tab {
          display: inline-block;
          padding: 0 0.5rem;
          color: #969696;
          cursor: pointer;
        }
        .tab:hover,
        .tab:active {
          background: #272727;
        }
        .tab.selected {
          background: #0c0c0c;
          color: #e8e8e8;
        }
        .content {
          flex: 1;
          text-align: left;
          line-height: 1.3rem;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
      <Tabs data={data.editorTabs}>
        {(onSelect, selectedFile, selectedIndex) => (
          <>
            <div className="header">
              <div className="button-group">
                <span className="button" />
                <span className="button" />
                <span className="button" />
              </div>
              <div className="title f6 no-drag">
                {data.editorTabs.map(file => (
                  <span
                    key={file}
                    className={classNames('tab', {
                      selected: selectedFile === file
                    })}
                    onClick={() => onSelect(file)}
                  >
                    {file}
                  </span>
                ))}
              </div>
            </div>
            <div className="content">
              {(() => {
                let SelectedFile = data.editorMapping[selectedFile]
                return <SelectedFile />
              })()}
            </div>
          </>
        )}
      </Tabs>
    </div>
  )
}
