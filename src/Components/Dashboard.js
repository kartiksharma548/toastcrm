import React, { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContext'
import LeadsChart from './LeadsChart'


export default function Dashboard() {
  const { user } = useContext(LoginContext)
  return (
    <div>
      {/* <h1>2</h1> */}
      <LeadsChart></LeadsChart>
    </div>
  )
}
