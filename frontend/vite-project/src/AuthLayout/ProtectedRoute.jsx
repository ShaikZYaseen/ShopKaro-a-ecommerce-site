import React from 'react'
import { useSelector } from 'react-redux'

function ProtectedRoute() {

    const user =  useSelector(state.login.state)
  return (
    <>



    </>
  )
}

export default ProtectedRoute