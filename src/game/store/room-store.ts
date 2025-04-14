import { Room } from '../types/room-player.type';

export class RoomStore {
  private rooms: Record<string, Room> = {};
  private socketToRoom: Record<string, string> = {};

  addPlayer(roomId: string, socketId: string): boolean {
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = { players: [], spectators: [] };
    }

    const room = this.rooms[roomId];
    if (room.players.length >= 2) {
      return false;
    }

    room.players.push(socketId);
    this.socketToRoom[socketId] = roomId;
    return true;
  }

  getPlayers(roomId: string): string[] {
    return this.rooms[roomId]?.players || [];
  }

  removePlayer(socketId: string) {
    const roomId = this.socketToRoom[socketId];
    if (!roomId) return;

    const room = this.rooms[roomId];
    room.players = room.players.filter((id) => id !== socketId);
    room.spectators = room.spectators.filter((id) => id !== socketId);
    delete this.socketToRoom[socketId];

    // optional: cleanup empty rooms
    if (room.players.length === 0 && room.spectators.length === 0) {
      delete this.rooms[roomId];
    }
  }
}
