import './theme.css';
import { StyledEngineProvider } from '@mui/material/styles';
import Button from 'react-bootstrap/Button';
//import {DataGrid} from '@mui/x-data-grid'
import EditableTable from './EditableTable'

function App() {
  return (
    <div className="App">
      <header className="App-header">
	<EditableTable />
      </header>
    </div>
  );
}

export default App;
