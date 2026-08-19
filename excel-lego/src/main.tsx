import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.scss';
import App from './App.tsx';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
 <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
)
