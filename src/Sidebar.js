import './Sidebar.css';
import {get_coin_info} from './api.js';

const Sidebar = ({ onContentChange }) => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul className="sidebar-buttons">
        <li>
          <button className="sidebar-btn" onClick={() => onContentChange('Home')}>
            Home
          </button>
        </li>
        <li>
          <button className="sidebar-btn" onClick={() => onContentChange('Gráfico Teste')}>
            Dashboard
          </button>
        </li>
        <li>
          <button className="sidebar-btn" onClick={async() => {
            const data = await get_coin_info('EUR-BRL');
            onContentChange(data.EURBRL.high);
            console.log(data.EURBRL.high);
          }}>
            Cotação Euro
          </button>
        </li>
        <li>
          <button className="sidebar-btn" onClick={() => onContentChange('Cotação')}>
            Cotação
          </button>
        </li>
        <li>
          <button className="sidebar-btn" onClick={() => onContentChange('Gráfico Cotação')}>
            Gráfico Cotação
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;