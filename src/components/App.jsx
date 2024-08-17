import { Link, Outlet } from 'react-router-dom';
import style from '../styles/App.module.css';

export default function App() {
  return (
    <>
      <div className={style.navbar}>
        Buy Something
        <Link to="homepage">HomePage</Link>
      </div>

      <div className={style.mainContent}>
        <Outlet></Outlet>
      </div>
    </>
  );
}
