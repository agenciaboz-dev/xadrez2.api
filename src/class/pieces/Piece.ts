import { Chessboard } from "../Board"
import { COLOR, POSITION } from "../chess"

export class Piece {
    color: COLOR
    position: POSITION
    label: string
    moved_times: number
    captured: Piece[] = []

    constructor(color: COLOR, position: POSITION) {
        this.color = color
        this.position = position
        this.label = ""
        this.moved_times = 0
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
        this.moved_times += 1
        this.position = to
        grid[from[0]][from[1]] = null
        grid[to[0]][to[1]] = this
    }

    getPositionDiffs(target_position: POSITION) {
        const diff_x = Math.max(this.position[0], target_position[0]) - Math.min(this.position[0], target_position[0])
        const diff_y = Math.max(this.position[1], target_position[1]) - Math.min(this.position[1], target_position[1])

        return { diff_x, diff_y }
    }

    attack(from: POSITION, to: POSITION, grid: Chessboard) {
        const enemy = grid[to[0]][to[1]]!
        this.captured.push(enemy)
        this.move(from, to, grid)
    }
}
