import React from 'react'
import { UserContext } from '../../context/userContext'
import { useContext } from 'react'

export default function DashBord() {
    const {user} =useContext(UserContext)
    return (
    <div><h1>DashBord</h1>
    {!!user &&(<h2>Hi {user.name}! </h2>)}
    </div>
  )
}
