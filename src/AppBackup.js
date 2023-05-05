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
	<table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
	</table>
        <Button variant='success'>Hello</Button>
      </header>
    </div>
  );
}

export default App;
