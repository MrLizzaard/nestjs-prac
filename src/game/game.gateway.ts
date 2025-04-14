import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import { JoinRoomDto } from './dto/join-room.dto';
import { MoveDto } from './dto/move.dto';

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly gameService: GameService) {}

  server: Server;

  handleConnection(socket: Socket) {
    console.log(`[CONNECT] ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`[DISCONNECT] ${socket.id}`);
    this.gameService.removePlayer(socket.id);
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(
    @MessageBody() body: JoinRoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const { roomId } = body;
    const result = this.gameService.addPlayerToRoom(roomId, socket);
    if (!result) {
      socket.emit('roomFull');
      return;
    }

    socket.join(roomId);

    const players = this.gameService.getRoomPlayers(roomId);
    if (players.length === 2) {
      this.server.to(roomId).emit('startGame', {
        black: players[0],
        white: players[1],
      });
    }
  }

  @SubscribeMessage('move')
  handleMove(@MessageBody() move: MoveDto, @ConnectedSocket() socket: Socket) {
    socket.to(move.roomId).emit('opponentMove', move);
  }
}
