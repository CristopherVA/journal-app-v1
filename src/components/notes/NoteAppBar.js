import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploadFile } from '../../action/notesAction';
import moment from 'moment';

export const NoteAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)

    const handleSave = () => {
        dispatch(startSaveNote(active))
    }

    const handlePictureUpload = () => {
        document.querySelector('#file').click();
    }

    const handlePictureChange = (e) => {
        const file = e.target.files[0];

        if ( file ){
            dispatch(startUploadFile(file))
        }
    }

    return (
        <div className="notes__appbar">
            
            <input 
                type="file" 
                style={{display: 'none'}} 
                id='file'
                name="file"
                onChange={handlePictureChange}
            />


            <span>
                {
                    moment().format("D  MMMM  YYYY")
                }
            </span>
            <div className="notes__button-content">
                <button className="btn" onClick={handlePictureUpload}>Picture</button>
                <button className="btn" onClick={handleSave} >Save</button>
            </div>
        </div>
    )
}
