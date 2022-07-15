import {createRoot} from 'react-dom/client';
import App from './App'
import './i18n'
// ReactDom.render(<App/>, document.getElementById('root'))
const container = document.getElementById('root');

// Create a root.
const root =createRoot(container);

// Initial render
root.render(<App name="Weather" />);