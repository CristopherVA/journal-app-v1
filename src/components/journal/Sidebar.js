import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JournalEntries } from './JournalEntries';
import { startLogout } from '../../action/authAction';
import { noteLogout, startNewNote } from '../../action/notesAction';

export const Sidebar = () => {

    const dispatch = useDispatch();

    const {name} = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout())
        dispatch(noteLogout())
    }

    const handleNewNote = () => {
        dispatch(startNewNote())
    }

    return (
        <sidebar className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3>
                    <i className="far fa-moon"></i>
                    <span>{ name }</span>
                </h3>

                <button onClick={handleLogout}className="btn">Logout</button>
            </div>

            <div onClick={handleNewNote} className="journal__new-entry">
                 <i className="far fa-calendar-plus fa-5x"></i>
                 <p>New Entry</p>
            </div>

            <JournalEntries />
        </sidebar>
    )
}
