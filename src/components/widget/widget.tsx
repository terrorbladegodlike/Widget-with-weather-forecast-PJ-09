import { WidgetBar } from "./widgetBar";
import { WidgetContent } from "./widgetContent";


function Widget() {
  return (
    <article className='widget'>
      <div className="widget__row">
        <WidgetBar />
        <WidgetContent />
      </div>
    </article>
  );
}
export default Widget;







