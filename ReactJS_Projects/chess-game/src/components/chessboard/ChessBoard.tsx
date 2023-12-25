import './ChessBoard.css';
import Tile from '../tile/tile';
import { useRef, MouseEvent } from 'react';

const horizoltalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

interface Piece {
	image: string;
	x: number;
	y: number;
}

const pieces: Piece[] = [];

for (let p = 0; p < 2; p++) {
	const type = p === 0 ? 'Black' : 'White';
	const y = p === 0 ? 7 : 0;
	pieces.push({ image: `assets/${type}_Rook.png`, x: 0, y });
	pieces.push({ image: `assets/${type}_Rook.png`, x: 7, y });
	pieces.push({ image: `assets/${type}_Knight.png`, x: 1, y });
	pieces.push({ image: `assets/${type}_Knight.png`, x: 6, y });
	pieces.push({ image: `assets/${type}_Bishop.png`, x: 2, y });
	pieces.push({ image: `assets/${type}_Bishop.png`, x: 5, y });
	pieces.push({ image: `assets/${type}_Queen.png`, x: 3, y });
	pieces.push({ image: `assets/${type}_King.png`, x: 4, y });
}
//black pieces
for (let i = 0; i < 8; i++) {
	pieces.push({ image: 'assets/Black_Pawn.png', x: i, y: 6 });
}
pieces.push({ image: 'assets/Black_King.png', x: 4, y: 7 });

//white pieces
for (let i = 0; i < 8; i++) {
	pieces.push({ image: 'assets/White_Pawn.png', x: i, y: 1 });
}

export default function ChessBoard() {
	const chessboardRef = useRef<HTMLDivElement>(null);
	let activePiece: HTMLElement | undefined = undefined;
	function GrabPiece(e: MouseEvent) {
		const element = e.target as HTMLElement;
		if (element.classList.contains('chess-piece')) {
			const x = e.clientX - 30;
			const y = e.clientY - 30;
			element.style.position = 'absolute';
			element.style.left = `${x}px`;
			element.style.top = `${y}px`;

			activePiece = element;
		}
	}

	function MovePiece(e: MouseEvent) {
		const chessboard = chessboardRef.current;
		if (activePiece && chessboard) {
			const minx = chessboard.offsetLeft - 15;
			const miny = chessboard.offsetTop - 5;
			const maxx = chessboard.offsetLeft + chessboard.clientWidth - 50;
			const maxy = chessboard.offsetTop + chessboard.clientHeight - 60 ;
			const x = e.clientX - 30;
			const y = e.clientY - 30;
			activePiece.style.position = 'absolute';
			// activePiece.style.left = `${x}px`;
			// activePiece.style.top = `${y}px`;

			if (y < miny) {
				activePiece.style.top = `${miny}px`;
			} else if (y > maxy) {
				activePiece.style.top = `${maxy}px`;
			} else {
				activePiece.style.top = `${y}px`;
			}

			if (x < minx) {
				activePiece.style.left = `${minx}px`;
			} else if (x > maxx) {
				activePiece.style.left = `${maxx}px`;
			} else {
				activePiece.style.left = `${x}px`;
			}
		}
	}

	function DropPiece(e: MouseEvent) {
		if (activePiece) {
			const x = e.clientX - 30;
			const y = e.clientY - 30;
			activePiece.style.position = 'absolute';
			activePiece.style.left = `${x}px`;
			activePiece.style.top = `${y}px`;

			activePiece = undefined;
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
