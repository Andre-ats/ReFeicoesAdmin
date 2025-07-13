import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLogin } from './Pages/PageLogin/PageLogin';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/login" element={<PageLogin />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;