import React, { useState } from 'react'
import { FormModal } from '../form-modal';

export const AddButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldAddPrice, setShouldAddPrice] = useState(false);
  const [shouldAddProduct, setShouldAddProduct] = useState(false);

  const handleAddPriceButton = () => {
    setShouldAddPrice(true);
  }

  const handleAddProductButton = () => {
    setShouldAddProduct(true);
  }

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
          <button onClick={handleAddPriceButton} style={{ fontWeight: 'bold' }}>AGREGAR PRECIO</button>
          <button onClick={handleAddProductButton} style={{ fontWeight: 'bold' }}>AGREGAR PRODUCTO</button>
        </div>
      )}
      <FormModal isOpen={shouldAddPrice} setIsOpen={setShouldAddPrice} setAddButton={setIsOpen} title='Nuevo precio' buttonName='Agregar precio' type='price' />
      <FormModal isOpen={shouldAddProduct} setIsOpen={setShouldAddProduct} setAddButton={setIsOpen} title='Nuevo producto' buttonName='Agregar producto' type='product' />
    </div>
  )
} 