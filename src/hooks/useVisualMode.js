import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);

    } else {
      setMode(newMode);
      setHistory([...history, mode]);
    }
  }

  function back() {
    if (history.length >= 1) {
      setMode(history[history.length-1])
      history.pop()
    }
  }

  return { mode, transition, back };

}