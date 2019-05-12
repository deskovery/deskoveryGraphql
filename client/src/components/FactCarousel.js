import React, { Component } from "react";

import makeCarousel from "react-reveal/makeCarousel";
// we'll need the Slide component for sliding animations
// but you can use any other effect
import Slide from "react-reveal/Slide";
// we'll use styled components for this tutorial
// but you can use any other styling options ( like plain old css )
import styled, { css } from "styled-components";

//pass down which cam on props... make facts into an object, find by key, each key will have a facts array on it.
let factsObj = {
  deWeERCVc2o: ["yay eagles", "I heart eagles", "baby Grace is growing up!"],
  uj3FqkflC7g: ["outer space cam!", "I love NASA", "I want to be an astronaut"],
  CEzSXX3tcmU: ["scuba cam", "under the sea"]
};

const width = "400px",
  height = "80px";

const Container = styled.div`
  border: 1px solid white;
  position: center;
  overflow: hidden;
  width: ${width};
  height: ${height};
`;

const Children = styled.div`
  width: ${width};
  position: relative;
  height: ${height};
`;
//   text-shadow: 1px 1px 1px #fff;
const Arrow = styled.div`
  z-index: 100;
  line-height: ${height};
  text-align: center;
  position: absolute;
  top: 0;
  width: 10%;
  font-size: 3em;
  cursor: pointer;
  user-select: none;
  ${props =>
    props.right
      ? css`
          left: 90%;
        `
      : css`
          left: 0%;
        `}
`;

const Dot = styled.span`
  font-size: 1.5em;
  font-color: white;
  cursor: pointer;
  text-shadow: 1px 1px 1px #fff;
  user-select: none;
`;
const Dots = styled.span`
  text-align: center;
  color: white;
  width: ${width};
  z-index: 100;
`;

const CarouselUI = ({ position, total, handleClick, children }) => (
  <Container>
    <Children>
      {children}
      <Arrow onClick={handleClick} data-position={position - 1}>
        {"<"}
      </Arrow>
      <Arrow right onClick={handleClick} data-position={position + 1}>
        {">"}
      </Arrow>
    </Children>
    <Dots>
      {Array(...Array(total)).map((val, index) => (
        <Dot
          className="dot"
          key={index}
          onClick={handleClick}
          data-position={index}
        >
          {index === position ? "● " : "○ "}
        </Dot>
      ))}
    </Dots>
  </Container>
);

const Carousel = makeCarousel(CarouselUI);

class FactCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facts: []
    };
  }

  componentDidMount() {
    console.log(factsObj, "FACTS OBJ");
    for (let key in factsObj) {
      if (key === this.props.destination) {
        let theseFacts = factsObj[key];
        this.setState({
          facts: theseFacts
        });
      }
    }
    console.log(this.state.facts, "FACTS ON STATE");
  }

  render() {
    return (
      <div className="carousel">
        <Carousel>
          {this.state.facts.map(fact => (
            <Slide right>
              <div className="facts">
                <p>{fact}</p>
              </div>
            </Slide>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default FactCarousel;
