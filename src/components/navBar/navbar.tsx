import React from 'react';
import shipImg from '../../assets/img/sity.jpeg';
import { useAppCustomState } from '../../hooks/appHook';



export function NavBar() {

  const { AppSwitch, HandleSetSwitch } = useAppCustomState()


  const chooseDayHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    HandleSetSwitch('today')
  }

  const chooseWeekHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    HandleSetSwitch('week')
  }

  // const shoot = () => {
  //   alert("Great Shot!");
  // }


  return (
    <div className='navbar'>
      <div className='navbar__row'>
        <button onClick={chooseDayHandler} className={AppSwitch == "today" ?  'navbar__btn--select navbar__btn' : 'navbar__btn'}>Today</button>
        <button onClick={chooseWeekHandler} className={AppSwitch == "week" ?  'navbar__btn--select navbar__btn' : 'navbar__btn'}>Week</button>
      </div>
      <div className='navbar__menu' >
        <button className='navbar__link' >℃</button>
        <button className='navbar__link' >℉</button>
        <div className='navbar__avatar' style={{ backgroundImage: `url(${shipImg})` }}></div>
      </div>
    </div>
  );
}



