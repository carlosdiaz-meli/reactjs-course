import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                ></textarea>

                <div className="notes__image">
                    <img
                        alt="imagen"
                        src="https://instagram.fbog2-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/123543230_119989269720774_2512677746243349415_n.jpg?_nc_ht=instagram.fbog2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=0rppnmi_zRoAX8MqDHW&tp=1&oh=2e1b058e0656b475b005cfcba556343a&oe=6014FE0E"
                    />
                </div>
            </div>
        </div>
    )
}
