import React, { useEffect, useState } from 'react';
import shipImg from '../../assets/img/ship.jpg';
import { getCityByPosition, getCurrentWeather, getDailyWeather, getFiveDays, getSearchLocations } from '../../hooks/apiHook';
import { useAppCustomState } from '../../hooks/appHook';
import config from '../../models/config';
import { ICurrentDayWeather, IDailyForecast, IWeekForecast, ILocation } from '../../models/stateApp';



export function SearchLocation() {

  const [inputSearch, setInputSearch] = React.useState('')
  const { AppCustomState, HandleSetSelectLocation, HandleSetDailyForecast, HandleSetCurrentWeather, HandleAddFindLocations, HandleSetWeekWeather,HandleClearFindLocations } = useAppCustomState()
  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.currentTarget.value);
    if (!event.currentTarget.value.length) {
      HandleClearFindLocations();
    }
  }

  useEffect(() => {
    // Устанавливается задержка перед отправкой запроса,
    // чтобы избежать ограничения api
    if (inputSearch.length) {
      const searchTimeout = setTimeout(() => {
        getSearchLocations(inputSearch)
          .then((response: ILocation[]) => {
            HandleAddFindLocations(response);
            console.log(AppCustomState);
            // setInputSearch(event.currentTarget.value);
          })
          .catch(() => {
            console.log("err 1");
            HandleAddFindLocations([]);
          });
      }, config.REQUEST_TIMEOUT);
      return () => clearTimeout(searchTimeout);
    } else {
      console.log("err 2");

      // HandleAddFindLocations([]);
    }
  }, [inputSearch]);
  const [error, setError] = useState<boolean>(false);
  
  const handleClick = () => {
    if (navigator.geolocation) {
      const success = (position: GeolocationPosition) => {

        getCityByPosition(position).then((response: ILocation[]) => {
          if (response.length) {
            HandleSetSelectLocation(response[0])
            getDailyWeather(response[0], 5)
            .then((response: IDailyForecast) => {
              HandleSetDailyForecast(response);
            })
            .catch(() => {
              console.log("err forecast");
              HandleSetDailyForecast({} as IDailyForecast);
            });
      
          getCurrentWeather(response[0])
            .then((response: ICurrentDayWeather) => {
              HandleSetCurrentWeather(response);
            })
            .catch(() => {
              console.log("err forecast");
              HandleSetCurrentWeather({} as ICurrentDayWeather);
            });
      
      
          getFiveDays(response[0])
            .then((response: IWeekForecast) => {
              HandleSetWeekWeather(response);
            })
            .catch(() => {
              console.log("err get week weather");
              HandleSetWeekWeather({} as IWeekForecast);
            })
          }
        });
      };
      navigator.geolocation.getCurrentPosition(success, () => {
        setError(true);
        setTimeout(() => setError(false), 5000);
      });
    }
  };
  // todo сделать запрос с задержкой перед выполнением .3s
  return (
    <div className="search">
      <button type="submit" className="search__btn--find"></button>
      <input type="text" className="search__text" onChange={searchHandler} placeholder='Search for places...' />
      <button onClick={handleClick} type="submit" className="search__btn--location"></button>
      {AppCustomState.SearchLocations.length > 0
        ?
        <ul className='search__results'>
          {AppCustomState.SearchLocations.map((link, i) => <LinkMenu key={i} {...link} ></LinkMenu>)}
        </ul>
        :
        <></>
      }
    </div>
  );
}
const LinkMenu = (props: ILocation) => {

  const { AppCustomState, HandleSetSelectLocation, HandleSetDailyForecast, HandleSetCurrentWeather, HandleClearFindLocations, HandleSetWeekWeather } = useAppCustomState()
  const HandleChooseLink = () => {
    // HandleChangeAppStateByClick(id)
    HandleClearFindLocations()
    HandleSetSelectLocation(props)

    getDailyWeather(props, 5)
      .then((response: IDailyForecast) => {
        HandleSetDailyForecast(response);
      })
      .catch(() => {
        console.log("err forecast");
        HandleSetDailyForecast({} as IDailyForecast);
      });

    getCurrentWeather(props)
      .then((response: ICurrentDayWeather) => {
        HandleSetCurrentWeather(response);
      })
      .catch(() => {
        console.log("err forecast");
        HandleSetCurrentWeather({} as ICurrentDayWeather);
      });


    getFiveDays(props)
      .then((response: IWeekForecast) => {
        HandleSetWeekWeather(response);
      })
      .catch(() => {
        console.log("err get week weather");
        HandleSetWeekWeather({} as IWeekForecast);

      })


  }

  return (
    <li onClick={HandleChooseLink} className="search__results--item"><span>{props.country}</span>{props.name}</li> // 
  )
}

