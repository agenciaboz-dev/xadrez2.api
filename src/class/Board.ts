import { Socket } from "socket.io"
import { ChessPiece } from "./ChessPiece"
import { POSITION } from "./chess"

export class Board {
    grid: (ChessPiece | null)[][]

    constructor() {
        this.grid = new Array(8).fill(null).map(() => new Array(8).fill(null))
    }

    addPiece(piece: ChessPiece, position: POSITION) {
        this.grid[position[0]][position[1]] = piece
    }

    movePiece(from: POSITION, to: POSITION) {
        const piece = this.grid[from[0]][from[1]]
        if (piece?.canMove(to, this.grid) && this.grid[to[0]][to[1]] === null) {
            this.grid[to[0]][to[1]] = piece
            this.grid[from[0]][from[1]] = null
        }

        this.print()
    }

    print() {
        const horizontalBorder = "   +---+---+---+---+---+---+---+---+"
        console.log("    0   1   2   3   4   5   6   7") // Column numbers
        console.log(horizontalBorder)
        for (let row = 0; row < this.grid.length; row++) {
            let rowString = `${row} |` // Include row number at the start of the row
            for (let col = 0; col < this.grid[row].length; col++) {
                const piece = this.grid[row][col]
                rowString += ` ${piece ? piece.label : " "} |`
            }
            console.log(rowString)
            console.log(horizontalBorder)
        }
        console.log("    0   1   2   3   4   5   6   7") // Repeat column numbers at the bottom for clarity
    }

    getPiece(position: POSITION) {
        const piece = this.grid[position[0]][position[1]]
        return piece
    }

    getPieceMovements(position: POSITION, socket?: Socket) {
        const piece = this.getPiece(position)
        if (piece) {
            const positions: POSITION[] = []

            this.grid.forEach((row, x) => {
                row.forEach((column, y) => {
                    const position: POSITION = [x, y]
                    if (piece.canMove(position, this.grid)) {
                        positions.push(position)
                    }
                })
            })

            socket?.emit("piece:movements", positions)

            return positions
        }

        return []
    }
}
