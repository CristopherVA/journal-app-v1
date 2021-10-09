import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../action/notesAction';

export const JournalEntry = ({ id, date, title, body, url }) => {

    const dispatch = useDispatch();

    const noteDate = moment(date);

    

    const handleEntryClick = () => {
        dispatch(activeNote(id, {date, title, body, url} ));
    }

    return (
        <div className="journal__entry  animate__animated animate__bounce animate__fadeInLeft" onClick={handleEntryClick}>
            {
                url &&
                <div style={{
                    width: '75px',
                    height: '100px',
                    backgroundImage: `url(${url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
               }}></div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">{ title }</p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>
            <div className="journal__entry-date">
                <span>{noteDate.format('dddd')}</span>
                <h3>{noteDate.format('Do')}</h3>
            </div>
        </div>
    )
}
