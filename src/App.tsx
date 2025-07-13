import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLogin } from './Pages/PageLogin/PageLogin';
import { PageDashboard } from './Pages/PageDashboard/PageDashboard';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/login" element={<PageLogin />} />
          <Route path="/admin/dashboard" element={<PageDashboard />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;