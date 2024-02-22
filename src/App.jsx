import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { setBoard, reset } from "./redux/modules/boardSlice";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [successMsg, setSuccessMsg] = useState("");

  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();
  console.log("board", board);

  const onClickSquare = (column, row) => {
    if (board[column][row]) {
      return;
    }
    // board[column][row] = currentPlayer;

    // setboard([...board]);
    dispatch(setBoard({ x: column, y: row, currentPlayer: currentPlayer }));
    if (currentPlayer === "O") {
      setCurrentPlayer("X");
    } else {
      setCurrentPlayer("O");
    }
  };

  useEffect(() => {
    console.log("board 바뀜");
    let gameOver = false;

    for (let i = 0; i < board.length; i++) {
      if (board[i][0] && board[i][1] && board[i][2]) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
          gameOver = true;
        }
      }
    }

    for (let i = 0; i < board.length; i++) {
      if (board[0][i] && board[1][i] && board[2][i]) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
          gameOver = true;
        }
      }
    }

    if (board[0][0] && board[1][1] && board[2][2]) {
      if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        gameOver = true;
      }
    }

    if (board[0][2] && board[1][1] && board[2][0]) {
      if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        gameOver = true;
      }
    }

    if (gameOver) {
      if (currentPlayer === "O") {
        console.log("X님의 승리");
        setSuccessMsg("X님이 승리하셨습니다.");
      } else {
        console.log("O님의 승리");
        setSuccessMsg("O님이 승리하셨습니다.");
      }

      //reset();
    }
  }, [board, currentPlayer]);

  useEffect(() => {
    if (successMsg) {
      alert(successMsg);
      dispatch(reset());
    }
  }, [successMsg, dispatch]);

  return (
    <>
      {`${currentPlayer}님의 차례입니다.`}
      <StyledContainer>
        <StyledColumn>
          <StyledRow
            onClick={() => {
              onClickSquare(0, 0);
            }}
          >
            {board[0][0]}
          </StyledRow>
          <StyledRow
            onClick={() => {
              onClickSquare(0, 1);
            }}
          >
            {board[0][1]}
          </StyledRow>
          <StyledRow
            onClick={() => {
              onClickSquare(0, 2);
            }}
          >
            {board[0][2]}
          </StyledRow>
        </StyledColumn>
        <StyledColumn>
          <StyledRow
            onClick={() => {
              onClickSquare(1, 0);
            }}
          >
            {board[1][0]}
          </StyledRow>
          <StyledRow
            onClick={() => {
              onClickSquare(1, 1);
            }}
          >
            {board[1][1]}
          </StyledRow>
          <StyledRow
            onClick={() => {
              onClickSquare(1, 2);
            }}
          >
            {board[1][2]}
          </StyledRow>
        </StyledColumn>
        <StyledColumn>
          <StyledRow
            onClick={() => {
              onClickSquare(2, 0);
            }}
          >
            {board[2][0]}
          </StyledRow>
          <StyledRow
            onClick={() => {
              onClickSquare(2, 1);
            }}
          >
            {board[2][1]}
          </StyledRow>
          <StyledRow
            onClick={() => {
              onClickSquare(2, 2);
            }}
          >
            {board[2][2]}
          </StyledRow>
        </StyledColumn>
      </StyledContainer>
      <button
        onClick={() => {
          dispatch(reset());
        }}
      >
        리셋하기
      </button>
    </>
  );
}

export default App;

const StyledContainer = styled.div`
  width: 150px;
  height: 150px;
  background-color: aqua;
  * {
    box-sizing: border-box;
  }
`;
const StyledRow = styled.div`
  border: 1px solid black;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledColumn = styled.div`
  //border-right: 1px solid black;
  display: flex;
`;
