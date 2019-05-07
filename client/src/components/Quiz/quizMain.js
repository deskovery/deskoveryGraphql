import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          name: 'land',
          gifs: [
            'https://cdn.dribbble.com/users/170025/screenshots/6024630/miro_bike.gif',
            'https://cdn.dribbble.com/users/41854/screenshots/1354767/camper_d.gif',
            'https://cdn.dribbble.com/users/180801/screenshots/4593496/dribbb.gif',
          ],
          next: [
            {
              name: 'forest',
              gifs: [],
            },
            { name: 'mountain', gifs: [''] },
          ],
        },
        {
          name: 'sky',
          gifs: [
            'https://cdn.dribbble.com/users/1194206/screenshots/2788480/_____01.gif',
            'https://cdn.dribbble.com/users/156577/screenshots/2134753/ezgif-585379989.gif',
            'https://cdn.dribbble.com/users/1904689/screenshots/4048390/ezgif.com-resize.gif',
          ],
          next: [
            { name: 'space', gifs: [] },
            { name: 'northernLights', gifs: [] },
          ],
        },
        {
          name: 'sea',
          gifs: [
            'https://cdn.dribbble.com/users/59947/screenshots/2966238/underwater-animation-v5.gif',
            'https://cdn.dribbble.com/users/2279258/screenshots/4541991/ezgif.com-optimize.gif',
            'https://cdn.dribbble.com/users/59947/screenshots/4217182/penguin-dribbble.gif',
          ],
          next: [{ name: 'scuba', gifs: [] }, { name: 'shore', gifs: [] }],
        },
      ],
      selected: null,
    };
    this.onSelection = this.onSelection.bind(this);
  }

  onSelection(event) {
    console.log(event.target.alt);
    // const targetState = this.state.options[event.target.alt].next;
    // if (targetState) {
    //   console.log(this.state);
    //   this.setState({ selected: targetState });
    // } else {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: '/userHome',
    //         video: this.selected.video,
    //       }}
    //     />
    //   );
    // }
    //eventually will make DB call for next option.
  }

  render() {
    if (!this.state.selected) {
      return (
        <div className="quizBox">
          <h1>Where to?</h1>
          {this.state.options.map(option => {
            console.log(option);
            const src =
              option.gifs[Math.floor(Math.random() * option.gifs.length)];
            return (
              <div className="optionBox" key={option.name}>
                <img src={src} alt={option.name} onClick={this.onSelection} />
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <quizQuestions
          selections={this.state.selection}
          onClick={this.onSelection}
        />
      );
    }
  }
}

export default Quiz;
