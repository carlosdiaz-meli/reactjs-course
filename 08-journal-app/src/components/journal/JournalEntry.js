import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div
                className="journal__entry-picture"
                style={
                    {
                        backgroundSize: 'cover',
                        backgroundImage: 'url(https://instagram.fbog2-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/127998073_695244544731846_5167536228265829214_n.jpg?_nc_ht=instagram.fbog2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=4I7lz1oa9LUAX9s9Mpq&tp=1&oh=2e1b33e0a1d1b32ebccba023a277ea1f&oe=60145AAD)',
                        backgroundPosition: 'center'
                    }
                }
            ></div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Titulo
                </p>
                <p className="journal__entry-content">
                    mukjsndfkjnsk gjsijf hisu dfisu divu sikv
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
