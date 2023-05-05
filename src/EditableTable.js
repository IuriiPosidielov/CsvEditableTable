import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbarContainer, GridToolbar, GridToolbarExport } from '@mui/x-data-grid';
import Papa from "papaparse";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ImportExport from '@mui/icons-material/ImportExport';

const allowedExtensions = ["csv"];

// test set
//const rows = [
//  { id: 1, question: 'Snow', answer: 'Jon'},
//  { id: 2, question: 'Lannister', answer: 'Cersei'},
//  { id: 3, question: 'Lannister', answer: 'Jaime'},
//  { id: 4, question: 'Stark', answer: 'Arya'},
//  { id: 5, question: 'Targaryen', answer: 'Daenerys'},
//  { id: 6, question: 'Melisandre', answer: null},
//  { id: 7, question: 'Clifford', answer: 'Ferrara'},
//  { id: 8, question: 'Frances', answer: 'Rossini'},
//  { id: 9, question: 'Roxie', answer: 'Harvey'},
//];


export default function EditableTable() {

// This state will store the parsed data
const [data, setData] = useState([]);

// It state will contain the error when
// correct file extension is not used
const [error, setError] = useState("");

// It will store the file uploaded by the user
const [file, setFile] = useState("");

const [datarows, setDatarows] = useState([])

const [selectionModel, setSelectionModel] = React.useState([]);

const [selectedRows, setSelectedRows]= React.useState([]);

const columns = [
  { field: 'id', headerName: 'id', width: 90 },
  {
    field: 'Question',
    headerName: 'Question',
    width: 150,
    editable: true,
  },
  {
    field: 'Answer',
    headerName: 'Answer',
    width: 150,
    editable: true,
  },
  {
    field: "delete",
    width: 75,
    sortable: false,
    disableColumnMenu: true,
    renderHeader: () => {
      return (
        <IconButton
          onClick={() => {
	    console.log(selectionModel);
            let selectedIDs = new Set(selectedRows);
            let rows = datarows.filter(row => !selectedIDs.has(row.id));
            setDatarows(rows);
          }}
        >
          <DeleteIcon />
        </IconButton>
      );
    }
  }
];


// This function will be called when
// the file input changes
function handleFileChange(e) {
        setError("");

        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }

            setFile(inputFile);
        }
    };
function handleParse() {

        // If user clicks the parse button without a file we show a error
        if (!file) return setError("Enter a valid file");

        const reader = new FileReader();
        // Event listener on reader when the file loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            let parsedData = csv?.data;
		console.log(parsedData.filter(el => el.id != ""));
	    parsedData = parsedData.filter(el => el.id != "");
	    setDatarows(parsedData);
        };
        reader.readAsText(file);
    };

// custom toolbar if no needs extra toolbar buttons
//function CustomToolbar() {
//  return (
//    <GridToolbarContainer>
//        <GridToolbarExport />
//    </GridToolbarContainer>
//  );
//}


function processRowUpdate(newRow)
{
	const updatedRow = { ...newRow, isNew: false };
	console.log(updatedRow);
	console.log(newRow.id);
	//handle send data to api
	let row = datarows.find(row => row.id === newRow.id);
	row.question = newRow.question;
	row.answer = newRow.answer;
    	return updatedRow;
}

function selectCheckbox(element) {
	setSelectedRows(element);
}


const [question, setQuestion] = React.useState("")
const [answer, setAnswer] = React.useState("")

function handleAddNew(){
	let len = datarows.length + 1;
	let res=[... datarows,{id:len, Question:question, Answer:answer}];
	setDatarows(res);
	setQuestion("");
	setAnswer("");
}

  return (
    <Box sx={{ p:2, height: 400, width: '100%' }}>
	<Button variant="contained" component="label">
        	Upload CSV file
        	<input onChange={handleFileChange} hidden name="file" type="file" />
      	</Button>
	<Button onClick={handleParse}><ImportExport />Import CSV</Button>
	<DataGrid
		pageSize={10}
		autoHeight={true}
		onRowSelectionModelChange={selectCheckbox}
        	rows={datarows}
        	columns={columns}
        	initialState={{
          		pagination: {
            			paginationModel: {
              			pageSize: 10 }}
                }}
        	pageSizeOptions={[10]}
        	checkboxSelection
        	disableRowSelectionOnClick
		processRowUpdate={processRowUpdate}
		slots={{ toolbar:GridToolbar }} />

	<Stack>
		<TextField id="question" value={question} onChange={(e)=>setQuestion(e.target.value)} label="Question" variant="standard" />
		<TextField id="answer" value={answer} onChange={(e)=>setAnswer(e.target.value)} label="Answer" variant="standard" />
		<Button onClick={handleAddNew}>Add new</Button>
	</Stack>
    </Box>
  );
}

 //<input onChange={handleFileChange}
 //              id="csvInput"
 //              name="file2"
 //              type="File" />
