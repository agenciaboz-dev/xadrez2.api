import { Chessboard } from "../Board"
import { COLOR, POSITION } from "../chess"
import { Piece } from "./Piece"

export class Tower extends Piece {
    label: string

    constructor(color: COLOR, position: POSITION) {
        super(color, position)
        this.label = "T" 
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

        if (!!diff_x && !!diff_y) {
            return false
        }

        const step_x = target_position[0] > this.position[0] ? 1 : -1
        const step_y = target_position[1] > this.position[1] ? 1 : -1

        if (this.position[0] !== target_position[0]) {
            for (let x = this.position[0] + step_x; x !== target_position[0]; x += step_x) {
                const position: POSITION = [x, this.position[1]]
                const obstacle = getPiece(position)
                if (obstacle) {
                    return false
                }
            }
        }

        if (this.position[1] !== target_position[1]) {
            for (let y = this.position[1] + step_y; y !== target_position[1]; y += step_y) {
                const position: POSITION = [this.position[0], y]
                const obstacle = getPiece(position)
                if (obstacle) {
                    return false
                }
            }
        }

        return true
    }
}
