import { Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useSelector, useDispatch } from "react-redux";
import { setCount } from "../States/Reducers/nextques";
import { useEffect, useState } from "react";
import { incScore } from "../States/Reducers/score";
import { incQu } from "../States/Reducers/correctans";

const Quiz = ({ que, options, correctans }) => {
  const quescount = useSelector((state) => state.qCount);
  const dispatch = useDispatch();
  const [rightans, setRightans] = useState(null);
  const [timer, setTimer] = useState(30); // Set timer duration in seconds
  const opts = Object.values(options);

  // Set correct answer
  useEffect(() => {
    Object.values(correctans).forEach((value, index) => {
      if (value === "true") {
        setRightans(opts[index]);
      }
    });
  }, [correctans, opts]);

  // Timer logic
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    if (timer === 0) {
      handleNext(); // Auto move to next question when timer reaches 0
    }

    return () => clearInterval(countdown); // Cleanup timer on unmount or question change
  }, [timer]);

  const handleClick = (event) => {
    const selectelem = event.target;
    if (selectelem.innerText === rightans) {
      selectelem.classList.toggle("bg-success");
      dispatch(incScore());
      dispatch(incQu());
    } else {
      selectelem.classList.toggle("bg-danger");
      Object.values(document.getElementsByClassName("opt")).forEach((value) => {
        if (value.innerText === rightans) {
          value.classList.toggle("bg-success");
        }
        value.disabled = true;
      });
    }
    Object.values(document.getElementsByClassName("opt")).forEach((value) => {
      value.disabled = true;
    });
  };

  function handleNext() {
    Object.values(document.getElementsByClassName("opt")).forEach((value) => {
      value.disabled = false;
    });
    const wrongselect = document.querySelector("button.bg-danger");
    const rightselect = document.querySelector("button.bg-success");
    if (wrongselect) {
      wrongselect.classList.remove("bg-danger");
    }
    if (rightselect) {
      rightselect.classList.remove("bg-success");
    }
    dispatch(setCount());
    setTimer(30); // Reset timer for next question
  }

  return (
    <div className="quizwindow">
      <div className="quiz-title d-flex flex-row justify-content-between align-items-center">
        <div className="quiz-ques">{que}</div>
        <div className="quiz-quescount">{quescount}/10</div>
      </div>
      <div className="quiz-timer">
        <h4>Time Remaining: {timer}s</h4>
      </div>
      <div className="quiz-opt">
        {opts.map((value, index) => {
          if (value != null) {
            return (
              <button key={index} className="opt" onClick={handleClick}>
                {value}
              </button>
            );
          }
          return null;
        })}
      </div>
      <div className="quiz-desc" hidden>
        The correct answer is b
      </div>
      <Button
        variant="contained"
        color="success"
        className="mt-3"
        endIcon={<NavigateNextIcon />}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Quiz;
