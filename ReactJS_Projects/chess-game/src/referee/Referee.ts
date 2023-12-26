import { PieceType, TeamType } from '../components/chessboard/ChessBoard';

export default class Referee {
	isValidMoved(px: number, py: number, x: number, y: number, type: PieceType, team: TeamType) {
		console.log('referee is checking the move...');
		console.log(`previous location:  (${px},${py})`);
		console.log(`current location:  (${x},${y})`);
		console.log(`piece type:  (${type})`);
		console.log(`team type:  (${team})`);

		if (type === PieceType.PAWN) {
			if (team === TeamType.OUR) {
				if (py === 1) {
					if ((px === x && y - py === 1) || y - py === 2) {
						console.log('valid move');
						return true;
					}
				} else {
					if (px === x && y - py === 1) {
						return true;
					}
				}
			}
		}
		return false;
	}
}
