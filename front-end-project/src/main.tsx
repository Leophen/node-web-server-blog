import ReactDOM from 'react-dom/client'
import App from './App'
import "@arco-design/web-react/dist/css/arco.css";
import { BrowserRouter } from 'react-router-dom'

document.body.setAttribute('arco-theme', 'dark');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
