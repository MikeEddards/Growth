import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './Components/Landing'
import Dashboard from './Components/Dashboard'
import Register from './Components/Register'
import ChildEdit from './Components/ChildEdit'
import DataAdder from './Components/DataAdder';
import ProfileEdit from './Components/ProfileEdit';
import AddChild from './Components/AddChild';
import HeightChart_0_36_boys from './Components/HeightChart_0_36_boys';
import HeightChart_0_36_girls from './Components/HeightChart_0_36_girls'
import ChartList from './Components/ChartList'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/register' component={Register} />
        <Route path='/childedit/:id' component={ChildEdit} />
        <Route path='/childdata/:id' component={DataAdder} />
        <Route path='/profileedit' component={ProfileEdit} />
        <Route path='/addchild' component={AddChild} />
        <Route path='/charts' component={ChartList} />
        <Route path='/HeightChart036boys' component={HeightChart_0_36_boys} />
        <Route path='/HeightChart036girls' component={HeightChart_0_36_girls} />
    </Switch>
)