import React, { useEffect } from 'react';
// import './Messenger.css';

const Messenger = () => {
    return (
            <div id="chat-container">
                <div id="search-container"><input type="text" placeholder="Search" /></div>
                <div id="conversation-list">
                    <div className="conversation active">
                        {/* <img
                            src="data:image/png;base64,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"
                            alt="Daryl Duckmanton"
                        /> */}
                        <div className="title-text">Daryl Duckmanton</div>
                        <div className="created-date">Apr 16</div>
                        <div className="conversation-message">This is a message</div>
                    </div>
                    <div className="conversation">
                        {/* <img
                            src="data:image/jpeg;base64,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"
                            alt="Kim O'Neil"
                        /> */}
                        <div className="title-text">Kim O'Neil</div>
                        <div className="created-date">Oct 20</div>
                        <div className="conversation-message">Ok fair enough. Well good talking to you.</div>
                    </div>
                </div>
                <div id="new-message-container"><button>+</button></div>
                <div id="chat-title">
                    <span>Daryl Duckmanton</span>
                    {/* <div title="Delete Conversation">
                        <svg className="trash-logo" enable-background="new 0 0 500 500" version="1.1" viewBox="0 0 500 500" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g>
                            <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10" x1="101.642" x2="120.633" y1="134.309" y2="430.972"></line>
                            <path d="   M120.633,430.972c0,10.5,8.519,19.031,18.992,19.031" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10"></path>
                            <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10" x1="139.625" x2="360.389" y1="450.003" y2="450.003"></line>
                            <path d="   M360.389,450.003c10.474,0,18.979-8.531,18.979-19.031" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10"></path>
                            <polyline fill="none" points="   379.367,430.972 398.386,134.309 101.642,134.309  " stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10"></polyline>
                            <path d="   M432.779,115.973c0,10.059-8.143,18.215-18.188,18.215" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10"></path>
                            <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10" x1="414.592" x2="85.409" y1="134.188" y2="134.188"></line>
                            <path d="   M85.409,134.188c-10.018,0-18.188-8.156-18.188-18.215" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10"></path>
                            <path d="   M67.221,115.973c0-10.019,8.17-18.188,18.188-18.188" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10"></path>
                            <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10" x1="85.409" x2="414.592" y1="97.784" y2="97.784"></line>
                            <path d="   M414.592,97.784c10.045,0,18.188,8.17,18.188,18.188" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10"></path>
                            <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10" x1="307.364" x2="307.364" y1="97.49" y2="68.988"></line>
                            <path d="   M307.364,68.988c0-10.474-8.505-18.991-18.965-18.991" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10"></path>
                            <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10" x1="288.399" x2="211.628" y1="49.997" y2="49.997"></line>
                            <path d="   M211.628,49.997c-10.487,0-18.979,8.518-18.979,18.991" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10"></path>
                            <polyline fill="none" points="   192.649,68.988 192.649,97.49 307.364,97.49  " stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10"></polyline>
                        </g>
                        <g>
                            <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10" x1="166.332" x2="166.332" y1="172.278" y2="406.06"></line>
                            <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10" x1="222.102" x2="222.102" y1="172.278" y2="406.06"></line>
                            <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10" x1="277.926" x2="277.926" y1="172.278" y2="406.06"></line>
                            <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2.6131" stroke-width="10" x1="333.669" x2="333.669" y1="172.278" y2="406.06"></line>
                        </g>
                </svg>
                </div> */}
            </div>
            <div id="chat-message-list">
                <div className="message-row you-message">
                    <div className="message-content">
                        <div className="message-text">Ok then</div>
                        <div className="message-time">Apr 16</div>
                    </div>
                </div>
                <div className="message-row other-message">
                    <div className="message-content">
                        <img
                            src="data:image/png;base64,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"
                            alt="Daryl Duckmanton"
                        />
                        <div className="message-text">
                            Yeah I think it's best we do that. Otherwise things won't work well at all. I'm adding more text here to test the sizing of the speech bubble and the wrapping of it too.
                    </div>
                        <div className="message-time">Apr 16</div>
                    </div>
                </div>
                <div className="message-row you-message">
                    <div className="message-content">
                        <div className="message-text">Maybe we can use Jim's studio.</div>
                        <div className="message-time">Apr 15</div>
                    </div>
                </div>
                <div className="message-row other-message">
                    <div className="message-content">
                        <img
                            src="data:image/png;base64,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"
                            alt="Daryl Duckmanton"
                        />
                        <div className="message-text">
                            All I know is where I live it's too hard to record because of all the street noise.
                    </div>
                        <div className="message-time">Apr 15</div>
                    </div>
                </div>
                <div className="message-row you-message">
                    <div className="message-content">
                        <div className="message-text">
                            Well we need to work out sometime soon where we really want to record our video course.
                    </div>
                        <div className="message-time">Apr 15</div>
                    </div>
                </div>
                <div className="message-row other-message">
                    <div className="message-content">
                        <img
                            src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gKgSUNDX1BST0ZJTEUAAQEAAAKQbGNtcwQwAABtbnRyUkdCIFhZWiAH4AALAAYAAAAxABthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAADhjcHJ0AAABQAAAAE53dHB0AAABkAAAABRjaGFkAAABpAAAACxyWFlaAAAB0AAAABRiWFlaAAAB5AAAABRnWFlaAAAB+AAAABRyVFJDAAACDAAAACBnVFJDAAACLAAAACBiVFJDAAACTAAAACBjaHJtAAACbAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABwAAAAcAHMAUgBHAEIAIABiAHUAaQBsAHQALQBpAG4AAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAMgAAABwATgBvACAAYwBvAHAAeQByAGkAZwBoAHQALAAgAHUAcwBlACAAZgByAGUAZQBsAHkAAAAAWFlaIAAAAAAAAPbWAAEAAAAA0y1zZjMyAAAAAAABDEoAAAXj///zKgAAB5sAAP2H///7ov///aMAAAPYAADAlFhZWiAAAAAAAABvlAAAOO4AAAOQWFlaIAAAAAAAACSdAAAPgwAAtr5YWVogAAAAAAAAYqUAALeQAAAY3nBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR7AABMzQAAmZoAACZmAAAPXP/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoVEREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/CABEIADAAMAMBIgACEQEDEQH/xAAaAAEBAAMBAQAAAAAAAAAAAAAFBAIDBgcI/8QAGAEBAQEBAQAAAAAAAAAAAAAABAMCAQX/2gAMAwEAAhADEAAAAfO1j2d8mlspjfjqb4rm+hPI+5CmgsVs86iMaF2+dto5qWe2c9hEERLcwiof/8QAHxAAAgICAgMBAAAAAAAAAAAAAgMBBAAFERIGExQy/9oACAEBAAEFAu2K17m1yRVPG0LqBY7s4Jg4Wns7amTmrROKJlYtwoTynHK9pT1YVAX7KdY2fO2wZ5BHGUvx5bak2JGBo3OYUiIlD5GI0SkWHXbBSFZvsoW+etcpJN4s8YIp2DrXI0nHFq0cZLj6smSPVPirsP/EABwRAAICAwEBAAAAAAAAAAAAAAABAgMREiEEMv/aAAgBAwEBPwGMcjo4S4edbzwWJ/KLCl6MnPDJ9P/EABwRAAICAwEBAAAAAAAAAAAAAAABAgMSISIRUf/aAAgBAgEBPwGT8MyGy3mCI/SlF/SEtFcsWf/EACgQAAEEAQMCBQUAAAAAAAAAAAEAAgMRIRIxMgRBBRMiUXEUUoGRof/aAAgBAQAGPwJGZ72dPF9z+60jxKviIgLzmOZPH7tN2mPLardWNkxhxqNJkbbELMNHwtlqZt3HYr6qHg7kO7CvypZ5ulZTB2wmOaDqt2xT/NbxXZrU43iln3TOiiO3qd89lHXGrWKorVSPso2yZjvKm6t/OQ4UQjxWMogk/pEVQWlCFoJL9gFRDXNbxsf1N9XJXoooisK1D1Got0OzS//EACAQAQACAgICAwEAAAAAAAAAAAEAESFBMWFRcYGRsfD/2gAIAQEAAT8hhm9MfmJkGdH2mMBXJ/cYDhwn9iA0s0MZlUUurYfX4METlpNuXPw9ykEuqn0XqfCxmzTvXRjuYdT7iWrNF0+FbbBAKstjAjTV2mvI9rh8GYdvkt5zG3mdMtDoy3ioLlxSNRk8s9nmvRRH8a/kXzMJubp2j1qblOLlbmZ4gLyTVSTfncPuym+OovJbMQQKQ5bcQArFzqp//9oADAMBAAIAAwAAABA8NDAEZcmn/8QAGhEAAwEAAwAAAAAAAAAAAAAAAAERIUFR0f/aAAgBAwEBPxCkZpCPDFs4TwTjB5R9exNEJun/xAAaEQEBAQEAAwAAAAAAAAAAAAABABEhMUGh/9oACAECAQE/EGEd3SCr2vyXlFs7IwLYTCl//8QAIhABAQACAQQCAwEAAAAAAAAAAREAITFBUXGBYZGhscHh/9oACAEBAAE/EGtZvu1aRdpbSXfXpgIdaIv7e8KOiEFAOgGANO5h5AHJu38jJkVIqBxc4cw6gBcCCF6yQD3YV8mEiQc05xTs0emB+nkxJQSBpdDlcjlj5f5l1EOVvQMbUHvHjfGAEfFGvBiAhxrBfPjB53kSL04NYj6YgA9kdOTFEr94SxHC6S2fFH6xt4DdVPfl594DoRIK3s/OJApUE2JjGHVJoyDM1yl4psuSRyfg2v4RPLmzrdVmp7b93tkmQcwduadM5W5JlwlM1J2MADioSFdeL9YolJKoTfs4G/jOjAi+AMfH+5Ri/cv8x07cCTFdrgcmCsVohn3n/9kgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA="
                            alt="Daryl Duckmanton"
                        />
                        <div className="message-text">
                            I'm just in the process of finishing off the last pieces of material for the course.
                    </div>
                        <div className="message-time">Apr 15</div>
                    </div>
                </div>
                <div className="message-row you-message">
                    <div className="message-content">
                        <div className="message-text">How's it going?</div>
                        <div className="message-time">Apr 13</div>
                    </div>
                </div>
                <div className="message-row other-message">
                    <div className="message-content">
                        <img
                            src="data:image/png;base64,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"
                            alt="Daryl Duckmanton"
                        />
                        <div className="message-text">Hey mate what's up?</div>
                        <div className="message-time">Apr 13</div>
                    </div>
                </div>
                <div className="message-row you-message">
                    <div className="message-content">
                        <div className="message-text">Hey Daryl?</div>
                        <div className="message-time">Apr 13</div>
                    </div>
                </div>
            </div>
            <form id="chat-form">
                {/* <div title="Add Attachment">
                    <svg version="1.1" className="attachment-logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.001 512.001" xml:space="preserve">
                    <path
                        d="M475.753,61.289c-48.329-48.329-126.967-48.329-175.296,0L15.535,346.212 c-20.713,20.713-20.713,54.413,0,75.127l50.085,50.085c20.713,20.713,54.413,20.713,75.127,0l221.305-221.305 c20.713-20.713,20.713-54.413,0-75.127s-54.413-20.713-75.127,0L168.981,292.935c-6.915,6.915-6.915,18.127,0,25.042 c6.915,6.915,18.127,6.915,25.042,0l117.943-117.943c6.903-6.903,18.137-6.906,25.042,0c6.906,6.906,6.903,18.14,0,25.042 L115.705,446.38c-6.903,6.903-18.137,6.906-25.042,0l-50.085-50.085c-6.906-6.906-6.903-18.14,0-25.042L325.499,86.332 c34.519-34.519,90.689-34.522,125.211,0s34.519,90.693,0,125.211l-181.56,181.56c-6.915,6.915-6.915,18.127,0,25.042 c6.915,6.915,18.127,6.915,25.042,0l181.56-181.56C524.083,188.256,524.083,109.62,475.753,61.289z"
                    ></path>
                    <g>
                        <path
                            d="M299.446,187.512L181.503,305.456c-4.623,4.623-6.081,11.149-4.523,17.045 c-2.924-0.772-5.705-2.231-7.997-4.523c-6.915-6.915-6.915-18.127,0-25.042l117.943-117.943c20.713-20.713,54.413-20.713,75.127,0 c2.137,2.137,3.999,4.44,5.695,6.826C347.015,167.074,318.022,168.936,299.446,187.512z"
                        ></path>
                        <path
                            d="M456.654,92.911c2.265,1.855,4.465,3.83,6.578,5.943c34.522,34.522,34.519,90.693,0,125.211 l-181.56,181.56c-4.623,4.623-6.081,11.149-4.523,17.045c-2.924-0.772-5.705-2.231-7.997-4.523c-6.915-6.915-6.915-18.127,0-25.042 l181.56-181.56C483.117,179.138,485.094,127.655,456.654,92.911z"
                        ></path>
                        <path
                            d="M115.705,446.38l221.305-221.305c4.613-4.613,6.07-11.142,4.519-17.04 c2.927,0.77,5.712,2.228,8.003,4.519c6.906,6.906,6.903,18.14,0,25.042L128.226,458.902c-6.903,6.903-18.137,6.906-25.042,0 L90.663,446.38C97.568,453.286,108.802,453.283,115.705,446.38z"
                        ></path>
                        <path
                            d="M312.978,73.811L28.057,358.732c-20.713,20.713-20.713,54.413,0,75.127l-12.521-12.521 c-20.713-20.713-20.713-54.413,0-75.127L300.457,61.289c48.329-48.329,126.967-48.329,175.296,0 c2.113,2.113,4.015,4.354,5.943,6.577C433.056,25.693,359.195,27.594,312.978,73.811z"
                        ></path>
                    </g>
                </svg>
            </div> */}
            <button><input type="text" placeholder="type a message" value="" /><button type="submit" className="primary-button" disabled=""/>Send</button>
        </form>
    </div >
    );
}

export default Messenger;