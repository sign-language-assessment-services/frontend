import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AssessmentsPage } from './assessments'
import { HelloWorld } from './hello-world'

export const Routes = (): ReactElement => (
  <Switch>
    <Route path="/assessments" component={AssessmentsPage} />
    <Route exact path="/" component={HelloWorld} />
    <Route>Not Found</Route>
  </Switch>
)
