import React, { Component } from 'react';
import '../../styles/game/chat.css';

export default class Chat extends Component {

    static Instance;

    constructor(params) {
        super(params);

        this.state = {
            chat: []
        };

        Chat.Instance = this;

        this.inputKeyUp.bind(this);
        this.sendClick.bind(this);
    }

    render() {
        return (
            <div className="section" style={{ width: "844px" }}>
                <h2>Chat</h2>
                <div className="chat-area">
                    <div className="chat-section">
                        <div className="chat-messages">
                            <ul>
                                {this.state.chat.map(function (message, index) {
                                    return <li key={index}>{message}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                    <input id="chat_box" type="text" onKeyUp={(event) => { this.inputKeyUp(event) }} />
                    <button id="chat_send" onClick={(event) => { this.sendClick() }}>Send</button>
                </div>
            </div>
        );
    }

    inputKeyUp(event) {
        if (event.keyCode === 13)
            document.getElementById("chat_send").click();
    }

    sendClick() {
        var chat_box = document.getElementById("chat_box");
        var text = chat_box.value;

        var message = "[" + this.getTimeAsString() + "] Player: " + text;

        this.addMessage(message);

        chat_box.value = "";
    }

    addMessage(message) {
        var chat = this.state.chat;
        chat.push(message);

        if (chat.length > 40) {
            chat = chat.shift();
        }

        this.setState({
            chat: chat
        });

    }

    getTimeAsString() {
        var date = new Date();
        return date.getHours() + ":" + date.getMinutes();
    }

}