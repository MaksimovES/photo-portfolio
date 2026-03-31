import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
