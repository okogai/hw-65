import NavBar from './components/NavBar/NavBar.tsx';
import { Route, Routes } from 'react-router-dom';
import ShowPage from './containers/ShowPage/ShowPage.tsx';
import PageForm from './components/PageForm/PageForm.tsx';

const App = () => {

  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<ShowPage pageNameByDefault="about" />} />
        <Route path="/:pageName" element={<ShowPage />} />
        <Route path="/edit" element={<PageForm />} />
        <Route path="*" element={<h1 className="text-center">Page Not Found</h1>} />
      </Routes>
    </>
  )
};

export default App;
