import React, { useState } from 'react'

export const AddButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="add-button-container">
      <button 
        className="add-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        +
      </button>
      {isOpen && (
        <div className="popup">
          <button onClick={() => console.log('Create x clicked')} style={{ fontWeight: 'bold' }}>AGREGAR PRECIO</button>
          <button onClick={() => console.log('Create y clicked')} style={{ fontWeight: 'bold' }}>CREAR PRODUCTO</button>
        </div>
      )}
    </div>
  )
}