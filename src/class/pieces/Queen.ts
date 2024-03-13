import { COLOR, POSITION } from "../chess"
import { Piece } from "./Piece"

export class Queen extends Piece {
    label: string

    constructor(color: COLOR, position: POSITION) {
        super(color, position)
        this.label = color == COLOR.white ? "Q" : "q"
    }
}
