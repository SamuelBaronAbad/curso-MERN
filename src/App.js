import { DatePicker } from 'antd';
import './App.scss';

function App() {

  const test = (date, dateString) => {
    console.log(date, dateString);
  }
  return (
    <div className="app">
      <h1>Web personal - Client <span>Samuel</span></h1>
      <DatePicker onChange={test}/>
      <h2>Proyecto</h2>
    </div>

  );
}

export default App;
