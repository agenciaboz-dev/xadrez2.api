import { COLOR, POSITION } from "../chess"
import { Piece } from "./Piece"

export class King extends Piece {
    label: string

    constructor(color: COLOR, position: POSITION) {
        super(color, position)
        this.label = color == COLOR.white ? "K" : "k"
    }
}
