import shipImg from '../../assets/img/sity.jpeg';
import { useAppCustomState } from '../../hooks/appHook';

export function Card() {

  const { AppSelectLocation } = useAppCustomState()
  return (
    <article className="card-v2" style={{ backgroundImage: `url(${shipImg})` }}>
      <div className="card-v2__body">
        <h3 className="card-v2__title">{AppSelectLocation.name ? AppSelectLocation.name + " , " + AppSelectLocation.country : "Выберите город в поиске"}</h3>
      </div>
    </article>
  );
}