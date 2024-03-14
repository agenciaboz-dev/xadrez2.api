import { ChessPiece } from "../ChessPiece"
import { COLOR, Chessboard, POSITION } from "../chess"

export class Piece {
    color: COLOR
    position: POSITION
    label: string

    constructor(color: COLOR, position: POSITION) {
        this.color = color
        this.position = position
        this.label = ""
    }

    canMove(target_position: POSITION, grid: Chessboard) {
        console.log(target_position)
        return false
    }

    canAttack(target_position: POSITION) {
        console.log(target_position)
        return false
    }

    move(from: POSITION, to: POSITION, grid: Chessboard) {
        this.position = to
        grid[from[0]][from[1]] = null
        grid[to[0]][to[1]] = this
    }
}
