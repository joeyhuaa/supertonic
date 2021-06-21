import React, { useState, useContext } from 'react'
import ThingsContext from './ThingsContext'
import  { Switch, Route } from 'react-router-dom'

import Sidebar from './Sidebar'
import NewProjectForm from './NewProjectForm'
import NewBranchForm from './NewBranchForm'
import Project from './Project'

export default function Container({
    projectSelected,
    children
}) {
    const things = useContext(ThingsContext)
    // console.log(things)

    let [state, setState] = useState({
        showNewProjectForm: false,
        showNewBranchForm: false
    })
    
    let toggleNewProjForm = (val) => {
        setState({...state, showNewProjectForm: val})
    }
    
    // pull up a form or some input 
    // call addBranch from inside here
    let toggleNewBranchForm = (val) => {
        setState({...state, showNewBranchForm: val})
    }

    return (
        <div id='main'>
            <div 
                id='overlay' 
                style={{
                    display: state.showNewProjectForm || state.showNewBranchForm ? 'block' : 'none',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    backgroundColor: 'black',
                    opacity: 0.6
                }} 
            />

            <Sidebar 
                newProjClicked={() => toggleNewProjForm(true)}
                projectSelected={projectSelected}
            />

            <Switch>
                <Route path='/projects/:projectId' component={Project} />
            </Switch>

            {state.showNewProjectForm &&
                <NewProjectForm 
                    closeSelf={() => toggleNewProjForm(false)}
                />
            }

            {state.showNewBranchForm &&
                <NewBranchForm 
                    closeSelf={() => toggleNewBranchForm(false)}
                />
            }

            {children}
        </div>
    )
}