import { useState } from 'react'

import './App.css'
import { Product } from './Product'

function App() {

  return (
    <div>
      <Product productName="Laptop" price={100000} />
    </div>
  )
}

export default App
