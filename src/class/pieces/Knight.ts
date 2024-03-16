import { Chessboard } from "../Board"
import { COLOR, POSITION } from "../chess"
import { Piece } from "./Piece"

export class Knight extends Piece {
    label: string

    constructor(color: COLOR, position: POSITION) {
        super(color, position)
        this.label = "H"
    }

    canMove(target_position: POSITION, grid: Chessboard): boolean {
        if (grid[target_position[0]][target_position[1]] !== null) {
            return false
        }

        const { diff_x, diff_y } = this.getPositionDiffs(target_position)

        if ((diff_x == 2 && diff_y == 1) || (diff_x == 1 && diff_y == 2)) {
            return true
        }

        return false
    }
}
