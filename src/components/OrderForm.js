import React, {useState, useEffect} from 'react';
import * from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const Order = () => {
const [order, setOrder] = useState({
    name: '',
    sizes: '',
    pepperoni: false,
    sausage: false,
    bacon: false,
    onion: false,
    green_pepper: false
    pineapple: false,
    extra_cheese: false,
    special: ''
})
const [errors, setErrors] = useState({
    name: '',
    sizes: '',
    pepperoni: false,
    sausage: false,
    bacon: false,
    onion: false,
    green_pepper: false
    pineapple: false,
    extra_cheese: false,
    special: ''
})
const [post, setPost] = useState();
const formSchema = yup.object().shape({
    name: yup
    .string()
    .required('Name is a required field')
    .min(2, 'Name must have at least 2 characters'),
    // sizes: yup
    // .string()
    // .max(1, 'Please choose your size')
    // .required('Please choose your size'),
})
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

const inputChange = (e) => {
    e.persist();
    console.log('Change logged');
    const newData = {
        ...order, 
        [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }
    const formData = {
        ...order, 
        [e.target.name]: e.target.value
    }
    validateChange(e)
    setOrder(newData)
}
const submitForm = (e) => {
    e.preventDefault();
    console.log('submitted')
    axios.post('https://reqres.in/api/users', order)
    .then ((res) => {
        console.log('success', res.data)
        setPost(res.data)
    })
    .catch('Error', errors)
    setOrder({
        name: "",
        size: "",
        sauce: "",
        pepperoni: false,
        sausage: false,
        bacon: false,
        onion: false,
        green_pepper: false,
        pineapple: false,
        extra_cheese: false,
        special: ""
    })

    return (
        <div>
            <form onSubmit={submitForm}>
                <label htmlFor='name' />Enter Your Name: <br />
                <input id='name' type='text' name='name' data-cy='name' value={order.name} onChange={inputChange}/>
                {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
                <br />
                <label htmlFor='sizes'>Choose Your Size: </label><br />
                <br />
                <select id='sizes' name='sizes' data-cy='sizes' value={order.size} onChange={inputChange}>
                    <option value='small' data-cy='sizes'>Small</option>
                    <option value='medium' data-cy='sizes'>Medium</option>
                    <option value='large' data-cy='sizes'>Large</option>
                </select>
                <br/>
                <br/>
                <label htmlFor='toppings' />Choose Your Toppings: 
                <br/>
                <br/>
                <input id='toppings' type='checkbox' value={order.toppings} onChange={inputChange} data-cy='toppings' name='pepperoni'/>Pepperoni<br/>
                <input id='toppings' type='checkbox' value={order.toppings} onChange={inputChange} data-cy='toppings' name='sausage'/>Sausage<br/>
                <input id='toppings' type='checkbox' value={order.toppings} onChange={inputChange} data-cy='toppings' name='bacon'/>Canadian Bacon<br/>
                <input id='toppings' type='checkbox' value={order.toppings} onChange={inputChange} data-cy='toppings' name='onion'/>Onions<br/>
                <input id='toppings' type='checkbox' value={order.toppings} onChange={inputChange} data-cy='toppings' name='green_pepper'/>Green Pepper<br/>
                <input id='toppings' type='checkbox' value={order.toppings} onChange={inputChange} data-cy='toppings' name='pineapple'/>Pineapple<br/>
                <input id='toppings' type='checkbox' value={order.toppings} onChange={inputChange} data-cy='toppings' name='extra_cheese'/>Extra Cheese<br/>
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