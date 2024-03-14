import { Bishop } from "./pieces/Bishop"
import { King } from "./pieces/King"
import { Knight } from "./pieces/Knight"
import { Pawn } from "./pieces/Pawn"
import { Piece } from "./pieces/Piece"
import { Queen } from "./pieces/Queen"
import { Tower } from "./pieces/Tower"

export type ChessPiece = Pawn | Tower | Bishop | Knight | King | Queen | Piece
