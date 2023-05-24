import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { deleteProduct, fetchOneProduct, updateProduct } from '../redux/reducers/productsReducer'
import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'

const EditProduct = () => {
  const id = useParams().id
  let idn = 0
  if (typeof id === 'string') {
    idn = parseInt(id)
  }
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({id: idn})

  useEffect(() => {
    dispatch(fetchOneProduct(id))
  }, [dispatch, id])

  const productState = useAppSelector(state => state.productsReducer)
  if (!productState.product) {
    return <div><p>No product available</p></div>
  }
  const { title, price, description } = productState.product

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateProduct(formData))
    setFormData({id: idn})
  }

  const deleteButton = () => {
    dispatch(deleteProduct(idn))
    navigate('/products')
  }

  return (
    <div>
      <h1>Edit product details or delete product</h1>
      <h2>Current Product</h2>
      <p>Name: {title}</p>
      <p>Price: {price}</p>
      <p>Description: {description}</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <legend>Edit info</legend>
          <label id='title'>New title:
            <input onChange={(e) => handleChange(e)} name='title' />
          </label><br />
          <label id='price'>New Price:
            <input onChange={(e) => handleChange(e)} name='price' />
          </label><br />
          <label id='description'>New description:
            <input onChange={(e) => handleChange(e)} name='description' />
          </label><br />
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
      <h2>
        <p>Delete product:</p>
        <button onClick={() => deleteButton()}>Delete product</button>
      </h2>
    </div>
  )
}

export default EditProduct
