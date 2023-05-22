import React, { useState } from 'react'
import { createNewProduct } from '../redux/reducers/productsReducer'
import useAppDispatch from '../hooks/useAppDispatch'

const CreateNewProduct = () => {
  const dispatch = useAppDispatch()
  const [title, setTitle] =useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState(5)
  const images = ['https://picsum.photos/300']
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createNewProduct({title, price, description, categoryId, images}))
  }
  return (
    <div>
      <h1>Create a new product</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <legend>New product info:</legend>
          <label id='title'>title:
            <input onChange={(e) => setTitle(e.target.value)} name='title' value={title} />
          </label>
          <br />
          <label id='price'>price:
            <input onChange={(e) => setPrice(parseInt(e.target.value))} name='price' value={price} />
          </label>
          <br />
          <label id='description'>description:
            <input onChange={(e) => setDescription(e.target.value)} name='description' value={description} />
          </label>
          <br />
          <label id='categoryId'>category id:
            <select name='categoryId' id='categoryId' onChange={(e) => setCategoryId(parseInt(e.target.value))}>
              <option value={1}>Clothes</option>
              <option value={2}>John</option>
              <option value={3}>Furniture</option>
              <option value={4}>Shoes</option>
              <option value={5}>Others</option>
            </select>
          </label>
          <button type='submit'>Submit</button>
        </fieldset>
      </form>
    </div>
  )
}

export default CreateNewProduct
