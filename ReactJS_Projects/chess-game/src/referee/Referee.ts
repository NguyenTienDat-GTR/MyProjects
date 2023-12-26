import { PieceType, TeamType, Piece } from '../components/chessboard/ChessBoard';

export default class Referee {
	tileIsOcupied(x: number, y: number, boardState: Piece[]): boolean {
		console.log('checking if  tile is ocupied...');
		const piece = boardState.find((p) => p.x === x && p.y === y);
		if (piece) {
			return true;
		} else {
			return false;
		}
	}
	isValidMoved(px: number, py: number, x: number, y: number, type: PieceType, team: TeamType, boardState: Piece[]) {
		// console.log('referee is checking the move...');
		// console.log(`previous location:  (${px},${py})`);
		// console.log(`current location:  (${x},${y})`);
		// console.log(`piece type:  (${type})`);
		// console.log(`team type:  (${team})`);

		if (type === PieceType.PAWN) {
			const specialRow = team === TeamType.OUR ? 1 : 6;
			const pawnDirection = team === TeamType.OUR ? 1 : -1;

			if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
				if (!this.tileIsOcupied(x, y, boardState) && !this.tileIsOcupied(x, y - pawnDirection, boardState)) {
					return true;
				}
			} else if (px === x && y - py === pawnDirection) {
				if (!this.tileIsOcupied(x, y, boardState)) {
					return true;
				}
			}
		}
		return false;
	}
}
