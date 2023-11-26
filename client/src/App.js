
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Protectedpages from './component/Protectedpages';
import Profile from './pages/profile';
import { useSelector } from 'react-redux';
import Spinner from './component/Spinner';
import ProjectInfo from './pages/ProjectInfo/ProjectInfo';


function App() {
  const {loading} = useSelector((state)=>state.loaders);
  return (
    <div>
          {loading&&<Spinner/>}
      <Router>
        <Routes>
          <Route path="/" element={<Protectedpages>
            <Home/>
          </Protectedpages>}></Route>
          <Route path="/profile" element={<Protectedpages>
            <Profile/>
          </Protectedpages>}></Route>
          <Route path="/project/:id" element={<Protectedpages>
            <ProjectInfo/>
          </Protectedpages>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
