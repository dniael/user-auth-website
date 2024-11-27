import React, { useContext, useState } from 'react'
import { myContext } from './Context'
import Button from 'react-bootstrap/Button'

export default function HomePage() {

  const [test, setTest] = useState<Array<any>>([])
  const [count, setCount] = useState(0)

  const updateTest = () => {
    setCount(count + 1)
    setTest(existingItems => {
      return [...existingItems, count]
    })
  }

  const testList = test.map(item => <ul><li>{item}</li></ul>)

  return (
    <>
    <h3>{testList}</h3>

    <Button variant='primary' onClick={() => updateTest()}>PRESS ME</Button>
    </>
  )
}
