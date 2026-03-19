import React from 'react'
import githubData from "../../assets/github.json"
import MacWindow from './MacWindow'
import './github.scss'


const Gitcard=({data={id:1, image:"", repoTitle:"", description:"", tags:[], repoLink:"", demoLink:""}})=>{
    return <div className="card">
        <img src={data.image} alt="" />
        <h1>{data.repoTitle}</h1>
        <p className='description'>{data.description}</p>

        <div className="tags">
            {
                data.tags.map(tag=> <p className='tag'>{tag}</p>)
            }
        </div>
        <div className="urls">
            <a href={data.repoLink}>Repository</a>
            {/*if demo link exists then  */}
            {data.demoLink && <a href={data.demoLink}>Demo Link</a>}
        </div>
    </div>
}

const Github = ({windowName, setWindowsState}) => {
  return (
    <div>
      <MacWindow windowName={windowName} setWindowsState={setWindowsState}>
        <div className="cards">
            {githubData.map(project=>{
                return <Gitcard data={project}/>
            })}
        </div>
      </MacWindow>
    </div>
  )
}
export default Github
