import { Server as SocketIoServer } from "socket.io"
import { Server as HttpServer } from "http"
import { Server as HttpsServer } from "https"
import { Socket } from "socket.io"
import google from "../google"
import { Room, RoomForm } from "../class/Room"
import { POSITION } from "../class/chess"

let io: SocketIoServer | null = null

export const initializeIoServer = (server: HttpServer | HttpsServer) => {
    io = new SocketIoServer(server, { cors: { origin: "*" }, maxHttpBufferSize: 1e8 })
    return io
}

export const getIoInstance = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized. Please call initializeIoServer first.")
    }
    return io
}

export const handleSocket = (socket: Socket) => {
    console.log(`new connection: ${socket.id}`)

    socket.on("disconnect", (reason) => {
        console.log(`disconnected: ${socket.id}`)
        Room.handleDisconnect(socket)
    })

    socket.on("google:login", (data) => google.login.login(socket, data))
    socket.on("google:exchange", (data) => google.login.exchangeCode(socket, data))

    socket.on("room:create", (data: RoomForm) => new Room(data, socket))
    socket.on("room:list", () => Room.list(socket))
    socket.on("room:printboard", () => Room.printBoard(socket))
    socket.on("room:leave", () => Room.handleDisconnect(socket))
    socket.on("piece:move", (data: { from: POSITION; to: POSITION }) => Room.find(socket)?.game?.board.movePiece(data.from, data.to))
}

export default { initializeIoServer, getIoInstance, handleSocket }
