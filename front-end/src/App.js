import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login';
import Main from './pages/Main';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/Login" element={<Login />}></Route>
        <Route path="/Main" element={<Main/>}></Route>
        <Route path="/" element={<Navigate to ="Login"/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
