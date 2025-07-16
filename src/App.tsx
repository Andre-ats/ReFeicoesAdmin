import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLogin } from './Pages/PageLogin/PageLogin';
import { PageDashboard } from './Pages/PageDashboard/PageDashboard';
import { ListagemItens } from './Pages/PageItens/ListagemItens/ListagemItens';
import { CriarItem } from './Pages/PageItens/CriarItem/CriarItem';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/login" element={<PageLogin />} />
          <Route path="/admin/dashboard" element={<PageDashboard />} />
          <Route path="/admin/itens/listagem" element={<ListagemItens />} />
          <Route path="/admin/itens/criarItem" element={<CriarItem />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;