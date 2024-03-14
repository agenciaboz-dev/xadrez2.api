import { uid } from "uid"
import { Game } from "./Game"
import { Player } from "./Player"
import { Socket } from "socket.io"
import { COLOR, POSITION } from "./chess"
import { WithoutFunctions } from "./helpers"
import { getIoInstance } from "../io/io"

export type RoomForm = Omit<WithoutFunctions<Room>, "id" | "game" | "players">

export let rooms: Room[] = []

export class Room {
    id: string
    game: Game | null = null
    players: Player[] = []
    name: string
    password: string

    constructor(data: RoomForm, socket: Socket) {
        rooms.push(this)
        this.id = uid()
        this.name = data.name
        this.password = data.password

        this.join(socket, COLOR.white)
        socket.broadcast.emit("room:update", this)
    }

    static list(socket: Socket) {
        socket.emit("room:list", rooms)
    }

    static find(socket: Socket) {
        const room = rooms.find((item) => item.players.find((player) => player.id == socket.id))
        return room
    }

    static printBoard(socket: Socket) {
        const room = Room.find(socket)
        if (room) {
            room.game?.board.print()
        }
    }

    static join(room_id: string, socket: Socket) {
        if (Room.find(socket)) return

        const room = rooms.find((item) => item.id == room_id)
        if (room) {
            room.join(socket, COLOR.black)
        }
    }

    static handleDisconnect(socket: Socket) {
        const room = Room.find(socket)
        if (room) {
            rooms = rooms.filter((item) => item.id != room.id)
        }
    }

    static movePiece(socket: Socket, from: POSITION, to: POSITION) {
        const room = Room.find(socket)
        if (room) {
            room.game?.board.movePiece(from, to)
            const io = getIoInstance()

            io.to(room.id).emit("piece:move", from, to)
        }
    }

    startGame() {
        this.game = new Game(this.players)
    }

    join(socket: Socket, color: COLOR) {
        this.players.push(new Player(color, socket.id))
        socket.join(this.id)

        if (this.players.length == 1) {
            this.startGame()
        }

        socket.emit("room:join", this)
    }
}
