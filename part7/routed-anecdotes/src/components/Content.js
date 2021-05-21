import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Menu from './Menu'
import CreateNew from './CreateNew'
import AnecdotesList from './AnecdotesList'
import About from './About'
import Anecdote from './Anecdote'

const Content = ({anecdotes, addNew, showNotification}) => {

  return (
    <Router>
      <Menu />
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes}/>
        </Route>
        <Route path="/new">
          <CreateNew addNew={addNew} showNotification={showNotification}/>
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