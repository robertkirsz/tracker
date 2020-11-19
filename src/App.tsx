import React from 'react'

import Div from './Div'
import Timeline from './Timeline'

export default function App() {
  return (
    <Div columnTop>
      <Timeline emoji="🍺" start={new Date('2020-11-14')} />
      <Timeline name="Samopoczucie" start={new Date('2020-10-05')} />
    </Div>
  )
}
