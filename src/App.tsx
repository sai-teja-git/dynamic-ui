import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import UserPages from './pages/user-pages/UserPages'
import loadable from "@loadable/component";
import PageNotFound from './components/PageNotFound';

const FormSettings = loadable(() => import("./pages/user-pages/FormConstructor"))
const FormView = loadable(() => import("./pages/user-pages/FormView"))

function App() {

  return (
    <Routes>
      <Route path='login' element={<Login />}></Route>
      <Route path='pages' element={<UserPages />}>
        <Route path='form-constructor' element={<FormSettings />}></Route>
        <Route path='form-view' element={<FormView />}></Route>
      </Route>
      <Route path='' element={<Login />}></Route>
      <Route path='*' element={<PageNotFound />}></Route>
    </Routes>
  )
}

export default App
