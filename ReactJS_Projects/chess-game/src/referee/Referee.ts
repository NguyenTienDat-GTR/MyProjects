import { PieceType, TeamType, Piece } from '../components/chessboard/ChessBoard';

export default class Referee {
	tileIsOcupied(x: number, y: number, boardState: Piece[]): boolean {
		const piece = boardState.find((p) => p.x === x && p.y === y);
		if (piece) {
			return true;
		} else {
			return false;
		}
	}

	tileIsOcupiedByOpponent(x: number, y: number, team: TeamType, boardState: Piece[]): boolean {
		const piece = boardState.find((p) => p.x === x && p.y === y && p.team !== team);

		if (piece) {
			return true;
		} else {
			return false;
		}
	}

	isEnPassantMove(
		px: number,
		py: number,
		x: number,
		y: number,
		type: PieceType,
		team: TeamType,
		boardState: Piece[]
	) {
		const pawnDirection = team === TeamType.OUR ? 1 : -1;

		if (type === PieceType.PAWN) {
			if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
				const piece = boardState.find((p) => p.x === x && p.y === y - pawnDirection && p.enPassant);
				if (piece) {
					return true;
				}
			}
		}
		//if the attacking piece is a pawn DONE
		//uper left or upper right || bottom left or bottom right DONE
		//if a piece is under / above the attacked tile DONE
		//if the attacked piecehas made an en passant move in the previous turn DONE

		//put piece in correct position
		//remove en passanted piece

		return false;
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

			//movement logic of the pawn
			if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
				if (!this.tileIsOcupied(x, y, boardState) && !this.tileIsOcupied(x, y - pawnDirection, boardState)) {
					return true;
				}
			} else if (px === x && y - py === pawnDirection) {
				if (!this.tileIsOcupied(x, y, boardState)) {
					return true;
				}
			}
			//  attack logic of the pawn
			else if (x - px === -1 && y - py === pawnDirection) {
				//attack in the upper or bottom left corner
				if (this.tileIsOcupiedByOpponent(x, y, team, boardState)) {
					return true;
				}
			} else if (x - px === 1 && y - py === pawnDirection) {
				//attack in the upper or bottom right corner
				if (this.tileIsOcupiedByOpponent(x, y, team, boardState)) {
					return true;
				}
			}
		}
		return false;
	}
}
