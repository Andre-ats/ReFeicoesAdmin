import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLogin } from './Pages/PageLogin/PageLogin';
import { PageDashboard } from './Pages/PageDashboard/PageDashboard';
import { ListagemItens } from './Pages/PageItens/ListagemItens/ListagemItens';
import { CriarItem } from './Pages/PageItens/CriarItem/CriarItem';
import { VerificarItens } from './Pages/PageItens/VerificarItens/VerificarItens';
import { ListagemPedidos } from './Pages/PagePedidos/ListagemPedidos/ListagemPedidos';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/login" element={<PageLogin />} />
          <Route path="/admin/dashboard" element={<PageDashboard />} />

          <Route path="/admin/itens/listagem" element={<ListagemItens />} />
          <Route path="/admin/itens/criarItem" element={<CriarItem />} />
          <Route path="/admin/itens/verificar/:id" element={<VerificarItens />} />

          <Route path="/admin/pedidos/listagem" element={<ListagemPedidos />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;