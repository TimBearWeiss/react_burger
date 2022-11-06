import React from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'





function App() {
  return (
    <div>
      <AppHeader />
      <main className='main'>
      <BurgerIngredients />
      <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
