import React from "react";
import styled from "styled-components";
import Sketch from "react-p5";

const AppDiv = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 1);
  padding: 5vmin;
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
  font-family: "Futura Std", "Futura", "Helvetica Neue";
`;

const App = () => {
  const [fill, setFill] = React.useState(0);

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const alpha = params.get("alpha") || 128;
  const strokeWeight = params.get("weight") || 1;
  const pointsLength = params.get("points") || 3;
  const r = params.get("radius") || 400;
  const w = params.get("width") || 1400;
  const h = params.get("height") || 1000;
  const rotation = ((params.get("rotation") || 180) / 180) * Math.PI;
  const xc = w / 2;
  const yc = h / 2;
  const points = [];

  const getPoint = (xc, yc, r, pointsLength, n) => {
    return {
      x: xc + r * Math.sin((n * 2 * Math.PI + rotation) / pointsLength),
      y: yc + r * Math.cos((n * 2 * Math.PI + rotation) / pointsLength)
    };
  };

  for (let n = 0; n < pointsLength; n++) {
    points[n] = getPoint(xc, yc, r, pointsLength, n);
  }

  let x = points[0].x;
  let y = points[0].y;

  const colors = [
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
  ];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(w, h).parent(canvasParentRef);
    p5.background("black");
    const initialColor = p5.color(colors[fill]);
    initialColor.setAlpha(alpha);
    p5.stroke(initialColor);
    p5.fill(initialColor);
    p5.strokeWeight(strokeWeight);
  };

  const draw = p5 => {
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
    p5.line(oldX, oldY, x, y);
    // p5.point(x, y);
    // p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);
  };

  const reverseColors = p5 => {
    const newFill = Math.floor(Math.random() * pointsLength);
    console.log("clicked! ", colors[newFill]);
    const newColor = p5.color(colors[newFill]);
    newColor.setAlpha(alpha);
    p5.stroke(newColor);
    p5.fill(newColor);
    setFill(newFill);
  };

  return (
    <AppDiv>
      <Sketch
        setup={setup}
        draw={draw}
        className="sketchcontainer"
        mouseClicked={reverseColors}
      />
      <Overlay>A</Overlay>
    </AppDiv>
  );
};

export default App;
