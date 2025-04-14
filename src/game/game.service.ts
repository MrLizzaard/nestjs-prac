// src/game/game.service.ts
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { RoomStore } from './store/room-store';

@Injectable()
export class GameService {
  private readonly store = new RoomStore();

  addPlayerToRoom(roomId: string, socket: Socket): boolean {
    return this.store.addPlayer(roomId, socket.id);
  }

  getRoomPlayers(roomId: string): string[] {
    return this.store.getPlayers(roomId);
  }

  removePlayer(socketId: string): void {
    this.store.removePlayer(socketId);
  }
}
