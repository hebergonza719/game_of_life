// Count neighbor function

export const countNeighbors = (x, y, matrix) => {
  let count = 0;
  if (x -1 >= 0 && y -1 >= 0) {
    if (matrix[x-1][y-1].isAlive) {
      count++;
    }
  }

  if (x -1 >= 0) {
    if (matrix[x-1][y].isAlive) {
      count++;
    }    
  }

  if (x -1 >= 0 && y+1 < 25) {
    if (matrix[x-1][y+1].isAlive) {
      count++;
    }
  }

  if (y+1 < 25) {
    if (matrix[x][y+1].isAlive) {
      count++;
    }
  }

  if (y -1 >= 0) {
    if (matrix[x][y-1].isAlive) {
      count++;
    }
  }
  
  if (x+1 < 25) {
    if (matrix[x+1][y].isAlive) {
      count++;
    }
  }

  if (x+1 < 25 && y -1 >= 0) {
    if (matrix[x+1][y-1].isAlive) {
      count++;
    }
  }

  if (x+1 < 25 && y+1 < 25) {
    if (matrix[x+1][y+1].isAlive) {
      count++;
    } 
  }
  
  return count;
};

// Set buffer function

export const setBuffer = (buffer, matrix) => {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      buffer[x][y].neighbors = countNeighbors(x, y, matrix);

      if (matrix[x][y].isAlive === true) {
        if (buffer[x][y].neighbors < 2) {
          buffer[x][y].isAlive = false;
        };
        if (buffer[x][y].neighbors >= 4) {
          buffer[x][y].isAlive = false;
        };
        if (buffer[x][y].neighbors === 2 || buffer[x][y].neighbors === 3) {
          buffer[x][y].isAlive = true;
        };
      } else if (matrix[x][y].isAlive === false) {
        if (buffer[x][y].neighbors === 3) {
          buffer[x][y].isAlive = true;
        };
      };
    };
  };
  return buffer;
};

// Switch isToggleable

export const switchToggleTrue = (matrix) => {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      matrix[x][y].isToggleable = true;
    };
  };
};