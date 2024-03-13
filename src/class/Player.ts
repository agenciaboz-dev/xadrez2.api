import { ChessPiece } from "./ChessPiece"
import { COLOR } from "./chess"
import { Bishop } from "./pieces/Bishop"
import { King } from "./pieces/King"
import { Knight } from "./pieces/Knight"
import { Pawn } from "./pieces/Pawn"
import { Queen } from "./pieces/Queen"
import { Tower } from "./pieces/Tower"

export class Player {
    id: string
    color: COLOR
    pieces: ChessPiece[] = []

    constructor(color: COLOR, id: string) {
        this.id = id
        this.color = color
        this.initializePieces()
    }

    initializePieces() {
        const pawn_line = this.color == COLOR.white ? 6 : 1
        const rear_line = this.color == COLOR.white ? 7 : 0

        for (let x = 0; x <= 7; x++) {
            this.pieces.push(new Pawn(this.color, [pawn_line, x]))
        }

        this.pieces.push(new Tower(this.color, [rear_line, 0]))
        this.pieces.push(new Tower(this.color, [rear_line, 7]))

        this.pieces.push(new Bishop(this.color, [rear_line, 1]))
        this.pieces.push(new Bishop(this.color, [rear_line, 6]))

        this.pieces.push(new Knight(this.color, [rear_line, 2]))
        this.pieces.push(new Knight(this.color, [rear_line, 5]))

        this.pieces.push(new King(this.color, [rear_line, 3]))
        this.pieces.push(new Queen(this.color, [rear_line, 4]))
    }
}
