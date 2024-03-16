import { Board } from "./Board"
import { Player } from "./Player"
import { COLOR, STATUS } from "./chess"

export class Game {
    board: Board
    players: Player[] = []
    current_turn: COLOR = COLOR.white
    status: STATUS = STATUS.paused

    constructor() {
        this.board = new Board()
        this.board.print()
    }

    switchTurn() {
        this.current_turn = this.current_turn == COLOR.white ? COLOR.black : COLOR.white
    }

    addPlayer(player: Player) {
        this.players.push(player)
        player.pieces.forEach((piece) => {
            this.board.addPiece(piece, piece.position)
        })
    }

    // toJSON() {
    //     return { ...this, io: null, room: null }
    // }
}
