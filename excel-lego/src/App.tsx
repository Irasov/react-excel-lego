import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';
import Series from './pages/Series';
import Instructions from './pages/Instructions';
import Media from './pages/Media';
import Contacts from './pages/Contacts';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />} >
        <Route path='' element={<Home />}/>
        <Route path='/series' element={<Series />}/>
        <Route path='/instructions' element={<Instructions />}/>
        <Route path='/media' element={<Media />}/>
        <Route path='/contacts' element={<Contacts />}/>
        <Route path='*' element={<NotFound />}/>
      </Route>
    </Routes>
  )
}

export default App
