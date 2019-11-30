import React from "react";
import styled from "styled-components";
import Sketch from "react-p5";

const AppDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 1);
  min-height: 100vh;
  & .sketchcontainer {
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
`;

const App = () => {
  const [fill, setFill] = React.useState(0);

  // const points = [
  //   { x: 700, y: 100 },
  //   { x: 100, y: 800 },
  //   { x: 1300, y: 800 }
  // ];
  // const alpha = 8;
  // const strokeWeight = 200;

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const alpha = params.get("alpha") || 128;
  const strokeWeight = params.get("weight") || 1;
  const points = params.get("points")
    ? [
        { x: 300, y: 100 },
        { x: 300, y: 900 },
        { x: 1100, y: 100 },
        { x: 1100, y: 900 }
      ]
    : [
        { x: 700, y: 100 },
        { x: 100, y: 800 },
        { x: 1300, y: 800 }
      ];

  const pointsLength = points.length;

  let x = points[0].x;
  let y = points[0].y;

  const colors = ["purple", "darkblue", "goldenrod", "turquoise"];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1400, 1000).parent(canvasParentRef);
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
    </AppDiv>
  );
};

export default App;
