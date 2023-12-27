import { PieceType, TeamType, Piece, Position } from '../constants';

export default class Referee {
	tileIsOcupied(x: number, y: number, boardState: Piece[]): boolean {
		const piece = boardState.find((p) => p.position.x === x && p.position.y === y);
		if (piece) {
			return true;
		} else {
			return false;
		}
	}

	tileIsOcupiedByOpponent(x: number, y: number, team: TeamType, boardState: Piece[]): boolean {
		const piece = boardState.find((p) => p.position.x === x && p.position.y === y && p.team !== team);

		if (piece) {
			return true;
		} else {
			return false;
		}
	}

	isEnPassantMove(
		initialPosition: Position,
		desiredPosition: Position,
		type: PieceType,
		team: TeamType,
		boardState: Piece[]
	) {
		const pawnDirection = team === TeamType.OUR ? 1 : -1;

		if (type === PieceType.PAWN) {
			if (
				(desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) &&
				desiredPosition.y - initialPosition.y === pawnDirection
			) {
				const piece = boardState.find(
					(p) =>
						p.position.x === desiredPosition.x &&
						p.position.y === desiredPosition.y - pawnDirection &&
						p.enPassant
				);
				if (piece) {
					return true;
				}
			}
		}

		return false;
	}
	isValidMoved(
		initialPosition: Position,
		desiredPosition: Position,
		type: PieceType,
		team: TeamType,
		boardState: Piece[]
	) {
		if (type === PieceType.PAWN) {
			const specialRow = team === TeamType.OUR ? 1 : 6;
			const pawnDirection = team === TeamType.OUR ? 1 : -1;

			//movement logic of the pawn
			if (
				initialPosition.x === desiredPosition.x &&
				initialPosition.y === specialRow &&
				desiredPosition.y - initialPosition.y === 2 * pawnDirection
			) {
				if (
					!this.tileIsOcupied(desiredPosition.x, desiredPosition.y, boardState) &&
					!this.tileIsOcupied(desiredPosition.x, desiredPosition.y - pawnDirection, boardState)
				) {
					return true;
				}
			} else if (
				initialPosition.x === desiredPosition.x &&
				desiredPosition.y - initialPosition.y === pawnDirection
			) {
				if (!this.tileIsOcupied(desiredPosition.x, desiredPosition.y, boardState)) {
					return true;
				}
			}
			//  attack logic of the pawn
			else if (
				desiredPosition.x - initialPosition.x === -1 &&
				desiredPosition.y - initialPosition.y === pawnDirection
			) {
				//attack in the upper or bottom left corner
				if (this.tileIsOcupiedByOpponent(desiredPosition.x, desiredPosition.y, team, boardState)) {
					return true;
				}
			} else if (
				desiredPosition.x - initialPosition.x === 1 &&
				desiredPosition.y - initialPosition.y === pawnDirection
			) {
				//attack in the upper or bottom right corner
				if (this.tileIsOcupiedByOpponent(desiredPosition.x, desiredPosition.y, team, boardState)) {
					return true;
				}
			}
		}
		return false;
	}
}
