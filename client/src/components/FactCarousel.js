import React, { Component } from "react";

import makeCarousel from "react-reveal/makeCarousel";
import Slide from "react-reveal/Slide";
import styled, { css } from "styled-components";

let factsObj = {
  gvMxUlS2VoU: [
    "Pandas are one of the most critically endangered species on our planet.",
    "Giant pandas were classified as an endangered species in the 1980s.",
    "There are only an estimated 1600 pandas in the wild and about 325 in captivity",
    "Pandas eat 24-40 pounds of bamboo a day, but they will also eat flowers, fix, and meat in captivity.",
    "Pandas spend up to 16 hours a day eating."
  ],
  "ktPv2E-FmmM": [
    "Jedediah Smith Redwood State Park is a 10,000-acre park in northern California.",
    `Jedediah Smith Redwood State Park is home to 7 percent of the world's remaining old-growth redwoods.`,
    "The 21-mile long Smith River is one of the few major rivers in the US that is not dammed.",
    "Dams impede the spawning of salmon, so this free-flowing river plays an important role in the larger Pacific Northwest ecosystem.",
    "These trees are coast redwoods, which are coniferous evergreen trees belonging to the cypress family."
  ]
};
// deWeERCVc2o: ['yay eagles', 'I heart eagles', 'baby Grace is growing up!'],
// uj3FqkflC7g: ['outer space cam!', 'I love NASA', 'I want to be an astronaut'],
// CEzSXX3tcmU: ['scuba cam', 'under the sea'],

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
    console.log("****HERE IN FACT CAROUSEL");
    for (let key in factsObj) {
      if (key === this.props.destination) {
        console.log(key, "key");
        let theseFacts = factsObj[key];
        this.setState({
          facts: theseFacts
        });
      }
    }
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
