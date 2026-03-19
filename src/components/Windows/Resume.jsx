import React from 'react'
import MacWindow from './MacWindow'
import './Resume.scss'

const Resume = ({windowName, setWindowsState}) => {
  return (
    <MacWindow windowName={windowName} setWindowsState={setWindowsState}
    >
        <div className="resume-window">
            <iframe src="/resume.pdf" frameborder="0"></iframe>
        </div>
    </MacWindow>
  )
}

export default Resume
