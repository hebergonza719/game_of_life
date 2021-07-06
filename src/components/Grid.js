import React, { useEffect, useState } from 'react';
import { countNeighbors, setBuffer } from '../helper/Helpers';
import '../App.css';

const Grid = ({ matrix, dimension }) => {
  let [refresh, setRefresh] = useState(false);
  let [inter, setInter] = useState(null); 
  let [gameOn, setGameOn] = useState(false);
  let [generation, setGeneration] = useState(0);

  const slow = 1000;
  const normal = 350;
  const fast = 100;

  let [speed, setSpeed] = useState(normal);

  const toggleStatus = (cx, cy) => (e) => {
    e.preventDefault();
    matrix[cx][cy].isAlive = !matrix[cx][cy].isAlive;
    setRefresh(!refresh);
  };

  const toggleClear = (e) => {
    e.preventDefault();
    for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[x].length; y++) {
        matrix[x][y].isAlive = false;
      };
    };
    clearInterval(inter);
    setGameOn(false);
    setGeneration(0);
    setRefresh(!refresh);

  };

  const toggleRandom = (e) => {
    e.preventDefault();
    if (!gameOn) {
      for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
          matrix[x][y].isAlive = Math.random() >= 0.7;
        };
      };
      setGeneration(0);
      setRefresh(!refresh);
    }
  };

  const setNextGen = () => {
    setGeneration(generation++);
    let buffer = new Array(dimension.row);

    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = new Array(dimension.col);
      for (let y = 0; y < buffer[i].length; y++) {
        buffer[i][y] = {
          isAlive: false,
          neighbors: countNeighbors()
        };
      };
    };

    buffer = setBuffer(buffer, matrix);

    for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[x].length; y++) {
        matrix[x][y] = buffer[x][y];
      };
    };
    setRefresh(refresh = !refresh);
  };

  const handleNextGen = (e) => {
    e.preventDefault();
    setGeneration(generation++);
    setNextGen();
  };

  const startGame = (e) => {
    e.preventDefault();
    setGameOn(true);
    setGeneration(generation++);
    setInter(setInterval(function() { setNextGen(); }, `${speed}`));
  };

  const stopGame = (e) => {
    e.preventDefault();
    clearInterval(inter);
    setGameOn(false);
  };

  const glider = (e) => {
    e.preventDefault();
    matrix[0][1].isAlive = true;
    matrix[1][2].isAlive = true;
    matrix[2][0].isAlive = true;
    matrix[2][1].isAlive = true;
    matrix[2][2].isAlive = true;
    setRefresh(!refresh);
  };

  const lwss = (e) => {
    e.preventDefault();
    matrix[8][0].isAlive = true;
    matrix[10][0].isAlive = true;
    matrix[11][1].isAlive = true;
    matrix[11][2].isAlive = true;
    matrix[11][3].isAlive = true;
    matrix[11][4].isAlive = true;
    matrix[10][4].isAlive = true;
    matrix[9][4].isAlive = true;
    matrix[8][3].isAlive = true;
    setRefresh(!refresh);
  };

  const mwss = (e) => {
    e.preventDefault();
    matrix[8][0].isAlive = true;
    matrix[10][0].isAlive = true;
    matrix[11][1].isAlive = true;
    matrix[11][2].isAlive = true;
    matrix[11][3].isAlive = true;
    matrix[11][4].isAlive = true;
    matrix[11][5].isAlive = true;
    matrix[7][2].isAlive = true;
    matrix[8][4].isAlive = true;
    matrix[9][5].isAlive = true;
    matrix[10][5].isAlive = true;
    setRefresh(!refresh);
  };

  const pulsar = (e) => {
    e.preventDefault();
    matrix[9][11].isAlive = true;
    matrix[10][11].isAlive = true;
    matrix[11][11].isAlive = true;
    matrix[9][13].isAlive = true;
    matrix[10][13].isAlive = true;
    matrix[11][13].isAlive = true;
    matrix[12][8].isAlive = true;
    matrix[12][9].isAlive = true;
    matrix[12][10].isAlive = true;
    matrix[14][8].isAlive = true;
    matrix[14][9].isAlive = true;
    matrix[14][10].isAlive = true;
    matrix[12][14].isAlive = true;
    matrix[12][15].isAlive = true;
    matrix[12][16].isAlive = true;
    matrix[14][14].isAlive = true;
    matrix[14][15].isAlive = true;
    matrix[14][16].isAlive = true;
    matrix[15][11].isAlive = true;
    matrix[16][11].isAlive = true;
    matrix[17][11].isAlive = true;
    matrix[15][13].isAlive = true;
    matrix[16][13].isAlive = true;
    matrix[17][13].isAlive = true;
    matrix[7][8].isAlive = true;
    matrix[7][9].isAlive = true;
    matrix[7][10].isAlive = true;
    matrix[7][14].isAlive = true;
    matrix[7][15].isAlive = true;
    matrix[7][16].isAlive = true;
    matrix[19][8].isAlive = true;
    matrix[19][9].isAlive = true;
    matrix[19][10].isAlive = true;
    matrix[19][14].isAlive = true;
    matrix[19][15].isAlive = true;
    matrix[19][16].isAlive = true;
    matrix[9][6].isAlive = true;
    matrix[10][6].isAlive = true;
    matrix[11][6].isAlive = true;
    matrix[9][18].isAlive = true;
    matrix[10][18].isAlive = true;
    matrix[11][18].isAlive = true;
    matrix[15][6].isAlive = true;
    matrix[16][6].isAlive = true;
    matrix[17][6].isAlive = true;
    matrix[15][18].isAlive = true;
    matrix[16][18].isAlive = true;
    matrix[17][18].isAlive = true;
    setRefresh(!refresh);
  };

  useEffect(() => {
  }, [refresh]);

  return (
    <div>
      <div className="gen-and-speed">
        <div className="gen-container">
          <div className="gen-title">Generation: {generation}</div>
          <button className="gen-button buttons" onClick={handleNextGen}>Next-Gen</button>         
        </div>
        <div className="speed-title">{speed === 100 ? "Speed: Fast" : undefined}</div>
        <div className="speed-title">{speed === 350 ? "Speed: Normal" : undefined}</div>
        <div className="speed-title">{speed === 1000? "Speed: Slow" : undefined}</div>
        <h4>Preset Shapes</h4>
        <div className="preset-buttons">
          <button className="buttons-preset" onClick={glider}>Glider</button>
          <button className="buttons-preset" onClick={lwss}>Lightweight Spaceship</button>
          <button className="buttons-preset" onClick={mwss}>Middleweight Spaceship</button>
          <button className="buttons-preset" onClick={pulsar}>Pulsar</button>
        </div>
      </div>

      <div>
        <div className="grid-container">
          {matrix.map((x, index) => (
            <div key={index} className="row">
              {x.map((y, index2) => (
                <div 
                  onClick={!gameOn ? toggleStatus(index, index2) : null} 
                  key={index2}
                  className={matrix[index][index2].isAlive ? 'cells-alive' : 'cells-dead'}
                >
                </div>
              ))
              }
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4>Main Controls</h4>
        <div className="button-container">
          <button className="buttons" onClick={!gameOn ? startGame : null}>Start</button>
          <button className="buttons" onClick={stopGame}>Stop</button>
          <button className="buttons" onClick={toggleRandom}>Random</button>
          <button className="buttons" onClick={toggleClear}>Clear</button>
        </div>
        <div>
          <h4>Select Speed</h4>
          <div className="speed-button-container">
            <button className="buttons" onClick={!gameOn ? (e) => {e.preventDefault(); setSpeed(slow);} : null}>Slow</button>
            <button className="buttons" onClick={!gameOn ? (e) => {e.preventDefault(); setSpeed(normal);} : null}>Normal</button>
            <button className="buttons" onClick={!gameOn ? (e) => {e.preventDefault(); setSpeed(fast);} : null}>Fast</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Grid;