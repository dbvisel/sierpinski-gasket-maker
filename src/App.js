import React from "react";
import styled from "styled-components";
import Sketch from "react-p5";
import { CompactPicker } from "react-color";

const AppDiv = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${props => props.backgroundColor};
  font-family: "Futura Std", "Futura", "Helvetica Neue";
  & .sketchcontainer {
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
`;

const Overlay = styled.div`
  position: fixed;
  color: rgba(0, 0, 0, 0.9);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 500px;
  text-align: center;
  padding-bottom: 15vh;
  user-select: none;
`;

const NavSection = styled.div`
  box-sizing: border-box;
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 0;
  top: 5vh;
  max-height: 90vh;
  overflow-y: hidden;
  width: 275px;
  background-color: rgba(32, 32, 32, 0.5);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  padding: 8px 16px;
  & details {
    user-select: none;
    appearance: none;
    outline: none;
    &:focus {
      border: none;
      outline: none;
      appearance: none;
    }
    & > div {
      overflow: scroll;
      box-sizing: border-box;
      margin: 8px 0 16px 0;
      height: calc(90vh - 56px);
    }
  }
  & label {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
  }
  & input {
    max-width: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    text-align: center;
    border: none;
  }
  & button {
    background-color: transparent;
    font-weight: bold;
    margin-left: auto;
    font-size: 110%;
    margin-bottom: 8px;
    border-radius: 4px;
    border: 1px solid gray;
    color: white;
  }
  & div > div {
    box-shadow: none !important;
    background: transparent !important;
    & input {
      color: white !important;
      margin-top: 3px;
      font-family: "Futura Std", "Futura", "Helvetica Neue";
    }
  }
`;

const App = () => {
  const search = window.location.search;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const params = new URLSearchParams(search);

  const [lines, setLines] = React.useState(true);
  const [showA, setShowA] = React.useState(true);
  const [clear, setClear] = React.useState(false);
  const [limit, setLimit] = React.useState(0);
  const [backgroundColor, setBackgroundColor] = React.useState("#000000");
  const [iterationLimit, setIterationLimit] = React.useState(1000);
  const [colors, setColors] = React.useState([
    "white",
    "#CCCCCC",
    "#888888",
    "purple",
    "darkblue",
    "goldenrod",
    "turquoise",
    "cyan",
    "magenta",
    "limegreen",
    "yellow",
    "teal",
    "red",
    "purple",
    "darkblue",
    "goldenrod",
    "turquoise",
    "cyan",
    "magenta",
    "limegreen",
    "yellow",
    "teal",
    "red"
  ]);
  const [radius, setRadius] = React.useState(params.get("radius") || 400);
  const [strokeWeight, setStrokeWeight] = React.useState(
    params.get("weight") || 1
  );
  const [xC, setXC] = React.useState(w / 2);
  const [yC, setYC] = React.useState(h / 2);
  const [paused, setPaused] = React.useState(false);
  const [pointsLength, setPointsLength] = React.useState(
    params.get("points") || 3
  );
  const [alpha, setAlpha] = React.useState(params.get("alpha") || 128);
  const [rotation, setRotation] = React.useState(
    ((params.get("rotation") || 180) / 180) * Math.PI
  );

  const points = [];
  let x = 0;
  let y = 0;

  const setUpPoints = () => {
    const getPoint = (xC, yC, radius, pointsLength, n) => {
      return {
        color: colors[n],
        x: xC + radius * Math.sin((n * 2 * Math.PI + rotation) / pointsLength),
        y: yC + radius * Math.cos((n * 2 * Math.PI + rotation) / pointsLength)
      };
    };

    for (let n = 0; n < pointsLength; n++) {
      points[n] = getPoint(xC, yC, radius, pointsLength, n);
    }
    x = points[0].x;
    y = points[0].y;
  };

  setUpPoints();

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(w, h).parent(canvasParentRef);
    const initialColor = p5.color(colors[0]);
    initialColor.setAlpha(alpha);
    p5.stroke(initialColor);
    p5.fill(initialColor);
  };

  let i = 0;

  const draw = p5 => {
    if (clear) {
      i = 0;
      p5.clear();
      setClear(false);
    }
    p5.strokeWeight(strokeWeight);
    i++;
    if (!paused && (!limit || (limit && i < iterationLimit))) {
      const randomValue = Math.floor(Math.random() * pointsLength);
      const newPoint = points[randomValue];
      const oldX = x;
      const oldY = y;
      x = (newPoint.x + x) / 2;
      y = (newPoint.y + y) / 2;
      // console.log(x, y);
      const newColor = p5.color(colors[randomValue]);
      newColor.setAlpha(alpha);
      p5.stroke(newColor);
      p5.fill(newColor);
      if (lines) {
        p5.line(oldX, oldY, x, y);
      } else {
        p5.point(x, y);
      }
      // p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);
    }
  };

  // const reverseColors = p5 => {
  //   setTimeout(() => {
  //     console.log("pausing!");
  //   }, 5000);
  // };

  return (
    <AppDiv backgroundColor={backgroundColor}>
      <Sketch
        setup={setup}
        draw={draw}
        className="sketchcontainer"
        // mouseClicked={reverseColors}
      />
      {showA ? <Overlay>A</Overlay> : null}
      <NavSection>
        <details>
          <summary>Change settings</summary>
          <div>
            <label>
              <span>
                <em>x</em> center:
              </span>
              <input
                name="height"
                type="numeric"
                value={xC}
                onChange={x => {
                  setXC(parseFloat(x.target.value) || w / 2);
                  setUpPoints();
                }}
              ></input>
            </label>
            <label>
              <span>
                <em>y</em> center:
              </span>
              <input
                name="height"
                type="numeric"
                value={yC}
                onChange={x => {
                  setYC(parseFloat(x.target.value) || h / 2);
                  setUpPoints();
                }}
              ></input>
            </label>{" "}
            <label>
              Points:{" "}
              <input
                name="height"
                type="numeric"
                value={pointsLength}
                onChange={x => {
                  console.log(`New points: ${x.target.value}`);
                  setPointsLength(
                    Math.min(Math.max(parseInt(x.target.value) || 3, 3), 20)
                  );
                  setUpPoints();
                }}
              ></input>
            </label>
            <label>
              Rotation:
              <input
                name="rotation"
                type="numeric"
                value={Math.floor((rotation * 180) / Math.PI)}
                onChange={x =>
                  setRotation(((parseInt(x.target.value) || 0) * Math.PI) / 180)
                }
              ></input>
            </label>
            <label>
              Alpha:{" "}
              <input
                name="alpha"
                type="numeric"
                value={alpha}
                onChange={x => {
                  setAlpha(
                    Math.max(Math.min(parseInt(x.target.value, 10), 255), 0) ||
                      255
                  );
                }}
              ></input>
            </label>
            <label>
              Stroke weight:{" "}
              <input
                name="radius"
                type="numeric"
                value={strokeWeight}
                onChange={x =>
                  setStrokeWeight(
                    Math.max(Math.min(parseInt(x.target.value) || 1, 1000)),
                    1
                  )
                }
              ></input>
            </label>
            <label>
              Radius:
              <input
                name="radius"
                type="numeric"
                value={radius}
                onChange={x => setRadius(x.target.value)}
              ></input>
            </label>
            <label>
              Lines:{" "}
              <input
                type="checkbox"
                checked={lines}
                onChange={() => setLines(!lines)}
              ></input>
            </label>
            <label>
              Show A:{" "}
              <input
                type="checkbox"
                checked={showA}
                onChange={() => setShowA(!showA)}
              ></input>
            </label>
            <label>
              Limit iterations:{" "}
              <input
                type="checkbox"
                checked={limit}
                onChange={() => {
                  if (limit) {
                    setLimit(0);
                  } else {
                    setClear(true);
                    setLimit(iterationLimit);
                  }
                }}
              ></input>
            </label>
            {limit ? (
              <label>
                Iteration limit:{" "}
                <input
                  name="iterationlimit"
                  type="numeric"
                  value={iterationLimit}
                  onChange={x => {
                    setIterationLimit(parseInt(x.target.value) || 0);
                    setClear(true);
                  }}
                ></input>
              </label>
            ) : null}
            <label>
              Pause:{" "}
              <input
                type="checkbox"
                checked={paused}
                onChange={() => setPaused(!paused)}
              ></input>
            </label>
            <label>
              <button
                onClick={e => {
                  e.preventDefault();
                  setClear(true);
                }}
              >
                Clear
              </button>
            </label>
            <label>Background color:</label>
            <CompactPicker
              color={backgroundColor}
              onChangeComplete={y => {
                setBackgroundColor(y.hex);
              }}
            />
            <label>Line colors:</label>
            {points.map((x, index) => (
              <CompactPicker
                color={x.color}
                key={index}
                onChangeComplete={y => {
                  const newColors = colors;
                  newColors[index] = y.hex;
                  setColors(newColors);
                }}
              />
            ))}
          </div>
        </details>
      </NavSection>
    </AppDiv>
  );
};

export default App;
