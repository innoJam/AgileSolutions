import React, { useState } from 'react';
import RetroCol from '../../../components/Retro-col';
import DefaultContent from './content.json';
import './index.css';

const RetroRoom = (props) => {
    const { history } = props;
    const [state, setState] = useState({ retro_boards_config: DefaultContent.retro_boards_config });
    const createRetroSession = (event) => {
        if (event) {
            event.stopPropagation();
        }
        let boards = [...state.retro_boards_config];
        boards = boards.filter(item => {
            return item.display.length > 0;
        })
        let data = {
            session: props.match.params.id,
            boards: boards
        }
        localStorage.setItem(props.match.params.id, JSON.stringify(data));
        history.replace(`/Retrospective/Session/${props.match.params.id}`)
    }

    const delBoard = (board_key) => {
        let prev_state = { ...state };
        console.log(board_key);
        let idx = prev_state.retro_boards_config.findIndex(item => item.key === board_key);
        prev_state.retro_boards_config.splice(idx, 1)
        prev_state.retro_boards_config.push({
            key: board_key,
            display: ""
        })
        console.log(prev_state);
        setState(prev_state);
    }

    const redirectBack = (event) => {
        const { history } = props;
        if (event) {
            event.stopPropagation();
        }
        history.replace(`/Retrospective/Dashboard`);
    }
    return (
        <div id="container">
            <header>
                <h1>
                    <button className="back-btn" onClick={(ev) => { redirectBack(ev) }}><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                    <span className="arrow-header">{props.match.params.id} Retro
                </span>
                </h1>          </header>
            <div id="track-progress">
                <RetroCol edit={true} DefaultContent={state} delBoard={delBoard} />
            </div>
            <button id="create-room" onClick={(event) => { createRetroSession(event) }}>Create Room</button>
        </div>
    )
}
export default RetroRoom;