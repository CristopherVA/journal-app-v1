import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NoteAppBar } from './NoteAppBar';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleteNote } from '../../action/notesAction';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    
    const { active:note } = useSelector(state => state.notes)
    const { value, handleInputChange, handleReset } = useForm(note) 
    const { title, body, id } = value

    const activeId = useRef(note.id)

    useEffect(() => {
        if (note.id !== activeId.current) {
            handleReset(note)
            activeId.current = note.id
        }
    }, [ note, handleReset ])

    useEffect(() => {   
        dispatch(activeNote(value.id, {...value}))
    }, [value, dispatch])

    const handleDelete = () => {
        dispatch(startDeleteNote(id))
    }

    return (
        <div className="notes__main-content">
            <NoteAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    name="title"
                    className="notes__title-input"
                    placeholder="Some awesome title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea 
                    placeholder="What Happend Today"
                    name="body"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>
            </div>

            {
                ( note.url ) &&
                (
                    <div style={{
                        width: '200px',
                        height: '200px',
                        backgroundImage: `url(${note.url})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        margin: '10px'
                    }}>
                    </div>
                )
            }

            <button className='btn-danger' onClick={handleDelete}>Delete</button>
        </div>
    )
}
