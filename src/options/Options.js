import logo from '../logo.svg';
import './Options.css';

function Options() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/options/Options.js</code> and save to reload.
        </p>
        <a
          className="App-link p-4 bg-blue-400 border-4 border-blue-500"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Options;
