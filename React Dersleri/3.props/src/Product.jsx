import React from 'react'

export const Product = (props) => {
    console.log(props);
    return (
        <div>
            <h2>Product Name: {props.productName}</h2>
            <h2>Price: {props.price}</h2>
        </div>
    )
}
