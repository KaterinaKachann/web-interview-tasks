import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SuperheroPage } from '~pages/superhero/superhero-page';

import { Layout } from './app/layout/layout';
import { Providers } from './app/providers';
import './root.css';
import { HomePage } from '~pages/home/ui/home-page';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route path=":id" element={<SuperheroPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Providers>
  );
}

export default App;

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
