import './ChessBoard.css';
import Tile from '../tile/tile';
import { useRef, MouseEvent, useState } from 'react';
import Referee from '../../referee/Referee';

const horizoltalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

export interface Piece {
	image: string;
	x: number;
	y: number;
	type: PieceType;
	team: TeamType;
}
export enum TeamType {
	OPPONENT,
	OUR,
}
export enum PieceType {
	PAWN,
	BISHOP,
	KNIGHT,
	ROOK,
	QUEEN,
	KING,
}

const initialPieces: Piece[] = [];
for (let p = 0; p < 2; p++) {
	const teamType = p === 0 ? TeamType.OPPONENT : TeamType.OUR;
	const type = teamType === TeamType.OPPONENT ? 'Black' : 'White';
	const y = teamType === TeamType.OPPONENT ? 7 : 0;
	initialPieces.push({ image: `assets/${type}_Rook.png`, x: 0, y, type: PieceType.ROOK, team: teamType });
	initialPieces.push({ image: `assets/${type}_Rook.png`, x: 7, y, type: PieceType.ROOK, team: teamType });
	initialPieces.push({ image: `assets/${type}_Knight.png`, x: 1, y, type: PieceType.KNIGHT, team: teamType });
	initialPieces.push({ image: `assets/${type}_Knight.png`, x: 6, y, type: PieceType.KNIGHT, team: teamType });
	initialPieces.push({ image: `assets/${type}_Bishop.png`, x: 2, y, type: PieceType.BISHOP, team: teamType });
	initialPieces.push({ image: `assets/${type}_Bishop.png`, x: 5, y, type: PieceType.BISHOP, team: teamType });
	initialPieces.push({ image: `assets/${type}_Queen.png`, x: 3, y, type: PieceType.QUEEN, team: teamType });
	initialPieces.push({ image: `assets/${type}_King.png`, x: 4, y, type: PieceType.KING, team: teamType });
}
//black pieces
for (let i = 0; i < 8; i++) {
	initialPieces.push({ image: 'assets/Black_Pawn.png', x: i, y: 6, type: PieceType.PAWN, team: TeamType.OPPONENT });
}

//white pieces
for (let i = 0; i < 8; i++) {
	initialPieces.push({ image: 'assets/White_Pawn.png', x: i, y: 1, type: PieceType.PAWN, team: TeamType.OUR });
}

export default function ChessBoard() {
	const [pieces, setPieces] = useState<Piece[]>(initialPieces);
	const [gridX, setGridX] = useState(0);
	const [gridY, setGridY] = useState(0);
	const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);

	const chessboardRef = useRef<HTMLDivElement>(null);

	const referee = new Referee();
	function GrabPiece(e: MouseEvent) {
		const element = e.target as HTMLElement;
		const chessboard = chessboardRef.current;
		if (element.classList.contains('chess-piece') && chessboard) {
			setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
			setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));
			const x = e.clientX - 50;
			const y = e.clientY - 50;
			element.style.position = 'absolute';
			element.style.left = `${x}px`;
			element.style.top = `${y}px`;

			setActivePiece(element);
		}
	}
	function MovePiece(e: React.MouseEvent) {
		const chessboard = chessboardRef.current;
		if (activePiece && chessboard) {
			const minX = chessboard.offsetLeft - 25;
			const minY = chessboard.offsetTop - 25;
			const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
			const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
			const x = e.clientX - 50;
			const y = e.clientY - 50;
			activePiece.style.position = 'absolute';

			//If x is smaller than minimum amount
			if (x < minX) {
				activePiece.style.left = `${minX}px`;
			}
			//If x is bigger than maximum amount
			else if (x > maxX) {
				activePiece.style.left = `${maxX}px`;
			}
			//If x is in the constraints
			else {
				activePiece.style.left = `${x}px`;
			}

			//If y is smaller than minimum amount
			if (y < minY) {
				activePiece.style.top = `${minY}px`;
			}
			//If y is bigger than maximum amount
			else if (y > maxY) {
				activePiece.style.top = `${maxY}px`;
			}
			//If y is in the constraints
			else {
				activePiece.style.top = `${y}px`;
			}
		}
	}

	function DropPiece(e: MouseEvent) {
		const chessboard = chessboardRef.current;
		if (activePiece && chessboard) {
			const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
			const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));

			const currenPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
			const attackedPiece = pieces.find((p) => p.x === x && p.y === y);

			if (currenPiece) {
				const validMove = referee.isValidMoved(gridX, gridY, x, y, currenPiece.type, currenPiece.team, pieces);

				if (validMove) {
					// update piece position
					// and if the piece is attacked, remove it

					const updatedPieces = pieces.reduce((result, piece) => {
						if (piece.x === gridX && piece.y === gridY) {
							piece.x = x;
							piece.y = y;
							result.push(piece);
						} else if (!(piece.x === x && piece.y === y)) {
							result.push(piece);
						}
						return result;
					}, [] as Piece[]);

					setPieces(updatedPieces);
				} else {
					//reset the piece position
					activePiece.style.position = 'relative';
					activePiece.style.removeProperty('left');
					activePiece.style.removeProperty('top');
				}
			}
			setActivePiece(null);
		}
	}

	let board = [];

	for (let j = verticalAxis.length - 1; j >= 0; j--) {
		for (let i = 0; i < horizoltalAxis.length; i++) {
			const number = i + j + 2;
			let image = undefined;
			pieces.forEach((p) => {
				if (p.x === i && p.y === j) {
					image = p.image;
				}
			});
			board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
		}
	}
	return (
		<div
			onMouseMove={(e) => MovePiece(e)}
			onMouseDown={(e) => GrabPiece(e)}
			onMouseUp={(e) => DropPiece(e)}
			ref={chessboardRef}
			id="chessboard"
		>
			{board}
		</div>
	);
}
//dừng
