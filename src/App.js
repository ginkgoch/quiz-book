import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import EnglishQuizPage from './pages/EnglishQuizPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<IndexPage />}></Route>
          <Route path='/quiz/:category/:type' element={<EnglishQuizPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
