import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import Recent from '../Recent';

// eslint-disable-next-line @typescript-eslint/naming-convention
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recent" element={<Recent />} />
      </Routes>
    </div>
  </BrowserRouter>
);
export default AppRouter;
