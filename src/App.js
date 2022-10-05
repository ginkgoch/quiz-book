import './App.css';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import EnglishQuizPage from './pages/EnglishQuizPage';
import EnglishSearchPage from './pages/EnglishSearchPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<IndexPage />}></Route>
          <Route path='/quiz/english/search' element={<EnglishSearchPage />}></Route>
          <Route path='/quiz/:category/:type' element={<EnglishQuizPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
