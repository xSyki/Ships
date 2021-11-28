if(randomNumber === 0) {
    if(newAiPreviusShot[1] - 1 >= 0 && newAiPreviusShot[0] >= 0 && newAiPreviusShot[1] - 1 <= 9 && newAiPreviusShot[0] <= 9) {
      if(newMyCellsStatus[newAiPreviusShot[0], newAiPreviusShot[1] - 1] !== "shotted" || "ship" ||"sinked") {
        x = newAiPreviusShot[0];
        y = newAiPreviusShot[1] - 1;
      }
    }
  }
  if(randomNumber === 1) {
    if(newAiPreviusShot[1] >= 0 && newAiPreviusShot[0] + 1 >= 0 && newAiPreviusShot[1] <= 9 && newAiPreviusShot[0] + 1 <= 9) {
      if(newMyCellsStatus[newAiPreviusShot[0] + 1, newAiPreviusShot[1]] !== "shotted" || "ship" ||"sinked") {
        x = newAiPreviusShot[0] + 1;
        y = newAiPreviusShot[1];
      }
    }
  }
  if(randomNumber === 2) {
    if(newAiPreviusShot[1] + 1 >= 0 && newAiPreviusShot[0] >= 0 && newAiPreviusShot[1] + 1 <= 9 && newAiPreviusShot[0] <= 9) {
      if(newMyCellsStatus[newAiPreviusShot[0], newAiPreviusShot[1] + 1] !== "shotted" || "ship" ||"sinked") {
        x = newAiPreviusShot[0];
        y = newAiPreviusShot[1] + 1;
      }
    }
  }
  if(randomNumber === 3) {
    if(newAiPreviusShot[1] >= 0 && newAiPreviusShot[0] - 1 >= 0 && newAiPreviusShot[1] <= 9 && newAiPreviusShot[0] - 1 <= 9) {
      if(newMyCellsStatus[newAiPreviusShot[0] - 1, newAiPreviusShot[1]] !== "shotted" || "ship" ||"sinked") {
        x = newAiPreviusShot[0] - 1;
        y = newAiPreviusShot[1];
      }
    }
  }