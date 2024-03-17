import { Chessboard } from "../Board"
import { COLOR, POSITION } from "../chess"
import { Piece } from "./Piece"

export class Pawn extends Piece {
    label: string

    constructor(color: COLOR, position: POSITION) {
        super(color, position)
        this.label = "P"
    }

    canMove(target_position: POSITION, grid: Chessboard): boolean {
        const { diff_x, diff_y } = this.getPositionDiffs(target_position)

        const step = this.color == COLOR.white ? -1 : 1

        if (target_position[0] == this.position[0] + step && diff_x == diff_y && grid[target_position[0]][target_position[1]]) {
            return true
        }
        if (grid[target_position[0]][target_position[1]]) return false

        if (target_position[0] == this.position[0] + step && target_position[1] == this.position[1]) {
            return true
        }


        if (this.moved_times === 0) {
            if (target_position[0] == this.position[0] + step * 2 && target_position[1] == this.position[1]) {
                return true
            }
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
