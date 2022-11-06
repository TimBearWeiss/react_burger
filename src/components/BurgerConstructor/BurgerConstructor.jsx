import React from 'react';
import ConstructorStyle from './BurgerConstructor.module.css';
import {ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {data} from '../../utils/data'
import PropTypes from 'prop-types';



const BurgerConstructor  = () => {

    const bun = data.find(item => item.type === 'bun');
    const mid = data.filter((item)=>item.type === 'main' || item.type === 'sauce') 


    return (
        <section className ={ConstructorStyle.section}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className ={ConstructorStyle.base}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>

                <div className ={ConstructorStyle.scroll}>
                    {mid.map((item) => (
                        <div className ={ConstructorStyle.relative}> 
                            <DragIcon type="primary" />
                            <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                            />
                        </div> 
                    ))}
                </div>
                <div className ={ConstructorStyle.base}>
                    <ConstructorElement
                        type="bottom"
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>

                <div className ={ConstructorStyle.down}>
                    <div className ={ConstructorStyle.price}>
                        <p className="text text_type_digits-medium mr-2">610</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>

            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
}; 


export default  BurgerConstructor;