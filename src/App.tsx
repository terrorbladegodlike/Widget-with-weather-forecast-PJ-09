import Main from './components/main'
import './App.scss';

function App() {

  return (
    //  wrapper отчечает за базовую расстановку контента на странице 
    <div className="wrapper">
      {/* main */}
      <Main />
    </div>
  );
}

export default App;
