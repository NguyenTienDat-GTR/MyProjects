import Tile from '../tile/tile';
import './ChessBoard.css';
import { useRef, MouseEvent, useState } from 'react';
import Referee from '../../referee/Referee';
import {
	VERTICAL_AXIS,
	HORIZONTAL_AXIS,
	GRID_SIZE,
	Piece,
	PieceType,
	TeamType,
	initialBoardState,
	Position,
	samePosition,
} from '../../constants';

export default function ChessBoard() {
	const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
	const [grabPosition, setGrapPosition] = useState<Position>({ x: -1, y: -1});
	const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);

	const chessboardRef = useRef<HTMLDivElement>(null);

	const referee = new Referee();
	function GrabPiece(e: MouseEvent) {
		const element = e.target as HTMLElement;
		const chessboard = chessboardRef.current;
		if (element.classList.contains('chess-piece') && chessboard) {
			const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
			const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE));
			setGrapPosition({ x: grabX, y: grabY });
			const x = e.clientX - GRID_SIZE / 2;
			const y = e.clientY - GRID_SIZE / 2;
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
			const x = e.clientX - GRID_SIZE / 2;
			const y = e.clientY - GRID_SIZE / 2;
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
			const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
			const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE));

			const currenPiece = pieces.find((p) => samePosition(p.position, grabPosition));

			if (currenPiece) {
				const validMove = referee.isValidMoved(
					grabPosition,
					{ x, y },
					currenPiece.type,
					currenPiece.team,
					pieces
				);
				const isEnPassantMove = referee.isEnPassantMove(
					grabPosition,
					{ x, y },
					currenPiece.type,
					currenPiece.team,
					pieces
				);

				const pawnDirection = currenPiece.team === TeamType.OUR ? 1 : -1;

				if (isEnPassantMove) {
					const updatedPieces = pieces.reduce((result, piece) => {
						if (samePosition(piece.position, grabPosition)) {
							piece.enPassant = false;
							piece.position.x = x;
							piece.position.y = y;
							result.push(piece);
						} else if (!samePosition(piece.position, { x, y: y - pawnDirection })) {
							if (piece.type === PieceType.PAWN) {
								piece.enPassant = false;
							}
							result.push(piece);
						}
						return result;
					}, [] as Piece[]);

					setPieces(updatedPieces);
				} else if (validMove) {
					// update piece position
					// and if the piece is attacked, remove it

					const updatedPieces = pieces.reduce((result, piece) => {
						if (samePosition(piece.position, grabPosition)) {
							//special move
							piece.enPassant = Math.abs(grabPosition.y - y) === 2 && piece.type === PieceType.PAWN;

							piece.position.x = x;
							piece.position.y = y;
							result.push(piece);
						} else if (!samePosition(piece.position, { x, y })) {
							if (piece.type === PieceType.PAWN) {
								piece.enPassant = false;
							}
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

	for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
		for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
			const number = i + j + 2;
			const piece = pieces.find((p) => samePosition(p.position, { x: i, y: j }));
			let image = piece ? piece.image : undefined;
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
