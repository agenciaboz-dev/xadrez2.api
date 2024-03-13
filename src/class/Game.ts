import { Board } from "./Board"
import { Player } from "./Player"
import { COLOR, STATUS } from "./chess"

export class Game {
    board: Board
    players: Player[]
    current_turn: COLOR = COLOR.white
    status: STATUS = STATUS.paused

    constructor(players: Player[]) {
        this.board = new Board()
        this.players = players

        this.players.forEach((player) => {
            player.pieces.forEach((piece) => {
                this.board.addPiece(piece, piece.position)
            })
        })

        this.board.print()
    }

    switchTurn() {
        this.current_turn = this.current_turn == COLOR.white ? COLOR.black : COLOR.white
    }

    // toJSON() {
    //     return { ...this, io: null, room: null }
    // }
}
