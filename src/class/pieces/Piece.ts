import { ChessPiece } from "../ChessPiece"
import { COLOR, POSITION } from "../chess"

export class Piece {
    color: COLOR
    position: POSITION

    constructor(color: COLOR, position: POSITION) {
        this.color = color
        this.position = position
    }

    canMove(target_position: POSITION, grid: (ChessPiece | null)[][]) {
        console.log(target_position)
        return false
    }

    canAttack(target_position: POSITION) {
        console.log(target_position)
        return false
    }
}
