import React from 'react';
import Ingredient from './Ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const Ingredients  = (props) => {


    return (
        <div className ={Ingredient.box}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src = {props.image} />
            <div className ={Ingredient.price}>
                <p className="text text_type_digits-default mr-2">{props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small">{props.name}</p>
        </div>
    );
}


 
export default  Ingredients;