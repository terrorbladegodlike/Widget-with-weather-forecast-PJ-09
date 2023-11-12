import { useAppCustomState } from "../../hooks/appHook"
import { AsideBar } from "../asideBar/asidebar"
import { DailyBar } from "../dailyBar/dailyBar"
import { NavBar } from "../navBar/navbar"
import { WeekBar } from "../weekBar/weekbar"

export const WidgetContent = () => {
  const { AppDailyForecast, AppSwitch } = useAppCustomState()


  return (
    <section className="widget__content ">
      {AppDailyForecast.list.length > 0 ?
        <div className='content__column'>
          <NavBar />
          {
            AppSwitch == "today"
              ?
              <DailyBar />
              :
              <WeekBar />
          }
          <AsideBar />
        </div>
        :
        <></>
      }

    </section>
  )
}