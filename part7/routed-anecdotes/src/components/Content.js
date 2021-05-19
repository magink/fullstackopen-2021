import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Menu from './Menu'
import CreateNew from './CreateNew'
import AnecdotesList from './AnecdotesList'
import About from './About'

const Content = ({anecdotes}) => {
  return (
    <Router>
      <Menu />
      <Switch>
        <Route path="/new">
          <CreateNew/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/">
          <AnecdotesList anecdotes={anecdotes}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default Content