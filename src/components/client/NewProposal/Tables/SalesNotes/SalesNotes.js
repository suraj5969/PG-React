import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import InfoPopup from '../../../PopUps/InfoPopup';
import ConfirmationPopup from '../../../PopUps/ConfirmationPopup';

export default function SalesNotes(props) {

    const { notes, setNotes, setValue, viewMode } = props;

    const StyledHeadCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#4db6ac',
            color: 'white',
            textAlign: 'center',
            padding: '5px',
        },
    }));
    const AddNotesRow = styled(TableRow)(({ theme }) => ({
        "&:last-child th, &:last-child td": {
            borderBottom: 0
        }
    }));

    const [emptyNotePopup, setEmptyNotePopup] = React.useState(false);
    const EmptyPopupClose = () => {
        setEmptyNotePopup(false);
    }

    const [deleteNoteIndex, setDeleteNoteIndex] = React.useState(null);

    const [deleteNotePopup, setDeleteNotePopup] = React.useState(false);

    let userId = null, fname = 'fname', lname = 'lname';
    if (sessionStorage.getItem('user_id')) {
        userId = sessionStorage.getItem('user_id');
    }
    else {
        console.log('session stroage user_id not working');
    }

    if (sessionStorage.getItem('fname') && sessionStorage.getItem('lname')) {
        fname = sessionStorage.getItem('fname');
        lname = sessionStorage.getItem('lname');
    }
    else {
        console.log('session stroage fname or lname not working');
    }
    const createNote = () => {
        const date = new Date();
        return {
            note_no: notes.length > 0 ? Number(notes[notes.length - 1].note_no) + 1 : 1,
            user_id: userId,
            date: moment(date).format('DD-MM-YYYY'),
            note: '',
            time: `${date.getHours()}:${date.getMinutes()}`,
            user: fname + ' ' + lname,
        }
    }

    const AddNote = () => {
        if (notes.length > 0) {
            if (notes[notes.length - 1].note.length > 0) {
                setNotes([...notes, createNote()])
            } else {
                setEmptyNotePopup(true);
            }
        } else {
            setNotes([createNote()]);
        }
    }

    const handelNoteChange = (event) => {
        const index = Number(event.target.id);
        let notesCopy = [...notes]
        notesCopy[index].note = event.target.value;
        setNotes(notesCopy);
    }

    const handelNoteDelete = (index) => {
        setDeleteNoteIndex(index);
        setDeleteNotePopup(true);
    }

    const DeletePopupClose = (confirmValue) => {
        if (confirmValue === true) {
            notes.splice(deleteNoteIndex, 1);
            setNotes(notes);
        }
        setDeleteNotePopup(false);
        // console.log(notes)
    }

    // Before uploading all notes check that all note have some note text
    // like user has created 5 notes and then removed all content of 2 and 3 note 
    // it can still add notes as 4th node has content 
    // so check before upload to database that all note all values
    // and only upload the notes taht have note text
    // may leave it as it dosent much imp funcnality


    return (
        <>
            <InfoPopup open={emptyNotePopup} onClose={EmptyPopupClose} title="Sales Note cannot be empty" bodyText="Please fill sales note" />
            <ConfirmationPopup open={deleteNotePopup} onClose={DeletePopupClose} title="Delete Note?" bodyText="Are you sure you want to delete note." />
            <Box sx={{ maxWidth: '1100px', marginBottom: '1.5rem' }}>
                <TableContainer>
                    <Table sx={{ border: 1 }}>
                        <TableHead>
                            <TableRow >
                                <StyledHeadCell>Date</StyledHeadCell>
                                <StyledHeadCell>Notes </StyledHeadCell>
                                <StyledHeadCell>Time </StyledHeadCell>
                                <StyledHeadCell>User </StyledHeadCell>
                                <StyledHeadCell>Delete </StyledHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {
                                notes.map((note, index) => (
                                    <TableRow key={note.note_no}>
                                        <TableCell align="center">
                                            {note.date}
                                        </TableCell>
                                        <TableCell align="center">
                                            <FormControl fullWidth variant="outlined">
                                                <OutlinedInput
                                                    sx={{ height: '2.2rem', minWidth: '250px' }}
                                                    id={`${index}`}
                                                    inputProps={{ maxLength: 555 }}
                                                    placeholder="Write something here..."
                                                    disabled={Number(note.user_id) !== Number(userId)  || viewMode}
                                                    value={note.note}
                                                    onChange={handelNoteChange}
                                                />
                                            </FormControl>
                                        </TableCell>
                                        <TableCell align="center">{note.time}</TableCell>
                                        <TableCell align="center">{note.user}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" style={{ background: '#ff6060', color: '#fff' }}
                                                onClick={() => handelNoteDelete(index)}
                                                disabled={Number(note.user_id) !== Number(userId) || viewMode}
                                                >
                                                Delete
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))
                            }
                            <AddNotesRow >
                                <TableCell>
                                    <Button onClick={() => setValue(2)}
                                        variant="contained" color="primary">Next</Button>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell align="center">
                                    <Button onClick={AddNote} disabled={viewMode} variant="contained" color="primary">Add Notes</Button>
                                </TableCell>
                            </AddNotesRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <Stack spacing={2} direction="row" sx={{ marginTop: '20px', marginLeft: '10px' }}>
                </Stack> */}
            </Box>
        </>
    );
}