import { Chessboard } from "../Board"
import { COLOR, POSITION } from "../chess"
import { Piece } from "./Piece"

export class Queen extends Piece {
    label: string

    constructor(color: COLOR, position: POSITION) {
        super(color, position)
        this.label = color == COLOR.white ? "Q" : "q"
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

        const diff_x = Math.max(this.position[0], target_position[0]) - Math.min(this.position[0], target_position[0])
        const diff_y = Math.max(this.position[1], target_position[1]) - Math.min(this.position[1], target_position[1])

        const isBishop = () => {
            if (diff_x != diff_y) {
                console.log("invalid")
                return false
            }

            const step_x = target_position[0] > this.position[0] ? 1 : -1
            const step_y = target_position[1] > this.position[1] ? 1 : -1

            for (let [x, y] = [this.position[0], this.position[1]]; x != target_position[0] && y != target_position[1]; x += step_x, y += step_y) {
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

        const isTower = () => {
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

        return isBishop() || isTower()
    }
}
