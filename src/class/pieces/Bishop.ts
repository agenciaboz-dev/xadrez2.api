import { Chessboard } from "../Board"
import { COLOR, POSITION } from "../chess"
import { Piece } from "./Piece"

export class Bishop extends Piece {
    label: string

    constructor(color: COLOR, position: POSITION) {
        super(color, position)
        this.label = "B"
    }

    canMove(target_position: POSITION, grid: Chessboard): boolean {
        const getPiece = (position: POSITION) => {
            const piece = grid[position[0]][position[1]]
            if (piece && piece != this) {
                console.log(`obstacle: ${piece.position} - ${piece.label}`)
                return piece
            }

            return null
        }

        if (getPiece(target_position)) {
            return false
        }

        const { diff_x, diff_y } = this.getPositionDiffs(target_position)

        if (diff_x != diff_y) {
            console.log("invalid")
            return false
        }

        const sum_x = target_position[0] > this.position[0] ? 1 : -1
        const sum_y = target_position[1] > this.position[1] ? 1 : -1

        for (let [x, y] = [this.position[0], this.position[1]]; x != target_position[0] && y != target_position[1]; x += sum_x, y += sum_y) {
            const obstacle = getPiece([x, y])
            if (obstacle) {
                return false
            }
        }

        if (target_position[0] != this.position[0] && target_position[1] != this.position[1]) {
            return true
        }

        return false
    }
}
