import React, {useState, useEffect} from 'react';
import * from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const formSchema = yup.object().shape({
    name: yup
    .string()
    .min(2, 'Name must contain at least 2 characters')
    .required('Name is a required field'),
    sizes: yup
    .string()
    .oneOf(['Small', 'Medium', 'Large'], 'Please choose a size')
    .required('Size is a required field'),
    toppings: yup
    .string()
    .required('Please choose at least 1 topping')
    special: yup
    .string()
    .max(255, 'Only 255 characters allowed')
    })

const Order = () => {
const [order, setOrder] = useState({
    name: '',
    size: '',
    toppings: '',
    special: ''
})
const [errors, setErrors] = useState({
    name: '',
    size: '',
    toppings: '',
    special: ''
})
const [toppings, setToppings] = useState([]);
const [post, setPost] = useState();

const checkBox = e => {
    const newTopping = {
        ...toppings,
        [e.target.checked]: e.target.value}
        setToppings(newTopping)
}
const validateChange = ((e) => {
    yup
    .reach(formSchema, e.target.name)
    .validate(e.target.value)
    .then((valid) => {})
    .catch(err => {})
    console.log(err)
    setErrors({
        ...errors,
        [e.target.name]: err.errors[0]
    })
})

const submitForm = (e) => {
    e.preventDefault();
    axios.post('http://reqres.in/', order)
    .then ((res) => {
        setOrder({
            name: '',
            size: '',
            toppings: '',
            special: ''
        })
    })
    .catch(errors)
}
const inputChange = (e) => {
    e.persist();
    console.log('Change logged');
    const newData = {
        ...order, 
        [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }
    validateChange(e)
    setOrder(newData)
}

    return (
        <div>
            <form onSubmit={submitForm}>
                <label htmlFor='name' />Enter Your Name: <br />
                <input id='name' type='text' name='name' value={order.name} onChange={inputChange}/>
                {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
                <br />
                <label htmlFor='sizes'>Choose Your Size: </label><br />
                <br />
                <select id='sizes' name='sizes' value={order.size} onChange={inputChange}>
                    <option value='small' data-cy='sizes'>Small</option>
                    <option value='medium' data-cy='sizes'>Medium</option>
                    <option value='large' data-cy='sizes'>Large</option>
                </select>
                <br/>
                <br/>
                <label htmlFor='toppings' />Choose Your Toppings: 
                <br/>
                <br/>
                <input id='toppings' type='checkbox' onClick={checkBox} checked={order.toppings} onChange={inputChange} name='pepperoni'/>Pepperoni<br/>
                <input id='toppings' type='checkbox' onClick={checkBox} checked={order.toppings} onChange={inputChange} name='sausage'/>Sausage<br/>
                <input id='toppings' type='checkbox' onClick={checkBox} checked={order.toppings} onChange={inputChange} name='bacon'/>Canadian Bacon<br/>
                <input id='toppings' type='checkbox' onClick={checkBox} checked={order.toppings} onChange={inputChange} name='onion'/>Onions<br/>
                <input id='toppings' type='checkbox' onClick={checkBox} checked={order.toppings} onChange={inputChange} name='green-pepper'/>Green Pepper<br/>
                <input id='toppings' type='checkbox' onClick={checkBox} checked={order.toppings} onChange={inputChange} name='pineapple'/>Pineapple<br/>
                <input id='toppings' type='checkbox' onClick={checkBox} checked={order.toppings} onChange={inputChange} name='extra-cheese'/>Extra Cheese<br/>
                <br/>
                <label htmlFor='special' />Additional Instructions:
                <br/>
                <textarea id='special' name='special'/>
                <br/>
                <br/>
                <button id='submit' type='submit' name='submit'>Add to order</button>
            </form>
            <pre>{JSON.stringify(order, null, 2)}</pre>
        </div>
    )
}

export default Order;