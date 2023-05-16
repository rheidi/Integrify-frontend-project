import React from 'react'
import { useSelector } from 'react-redux'

import { GlobalState } from './redux/store'
import useAppSelector from './hooks/useAppSelector'

const App = () => {
  const globalState = useSelector(state => state)
  //const users = useSelector((state: GlobalState) => state.usersReducer)
  const users = useAppSelector(state => state.usersReducer)
  return (
    <div>App</div>
  )
}

export default App