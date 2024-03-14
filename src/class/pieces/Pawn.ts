import { ChessPiece } from "../ChessPiece"
import { COLOR, POSITION } from "../chess"
import { Piece } from "./Piece"

export class Pawn extends Piece {
    label: string

    constructor(color: COLOR, position: POSITION) {
        super(color, position)
        this.label = color == COLOR.white ? "P" : "p"
    }

    canMove(target_position: POSITION, grid: (ChessPiece | null)[][]): boolean {
        const sum = this.color == COLOR.white ? -1 : 1


        if (
            target_position[0] == this.position[0] + sum &&
            target_position[1] == this.position[1] &&
            grid[target_position[0]][target_position[1]] === null
        ) {
            return true
        }

        return false
    }

    canAttack(target_position: POSITION): boolean {
        const sum = this.color == COLOR.white ? -1 : 1

        if (target_position[0] == this.position[0] + sum && target_position[1] + this.position[1] + sum) {
            return true
        }

        return false
    }
}
