import React, { Component } from 'react';
import { Redirect, History } from 'react-router-dom';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: 'Where to?',
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
              gifs: [
                'https://cdn.dribbble.com/users/655449/screenshots/2896602/fodadrib.gif',
                'https://cdn.dribbble.com/users/720555/screenshots/3432505/woods_800x600.gif',
              ],
              videoId: 'z5F1a7_dsrs',
            },
            {
              name: 'mountain',
              gifs: [
                'https://cdn.dribbble.com/users/853467/screenshots/2826543/viewpoint-dribble.gif',
                'https://cdn.dribbble.com/users/1455307/screenshots/4574457/back_view_on_snow_mountain.gif',
              ],
              videoId: 'deWeERCVc2o',
            },
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
            {
              name: 'space',
              gifs: [
                'https://cdn.dribbble.com/users/914927/screenshots/2454500/d_astro1_3.gif',
                'https://cdn.dribbble.com/users/59947/screenshots/4516932/astronaut.gif',
              ],
              videoId: 'uj3FqkflC7g',
            },
            {
              name: 'northernLights',
              gifs: [
                'https://cdn.dribbble.com/users/967416/screenshots/3259814/aurora_dribble.gif',
              ],
              videoId: 'CwriDd8STdI',
            },
          ],
        },
        {
          name: 'sea',
          gifs: [
            'https://cdn.dribbble.com/users/59947/screenshots/2966238/underwater-animation-v5.gif',
            'https://cdn.dribbble.com/users/2279258/screenshots/4541991/ezgif.com-optimize.gif',
            'https://cdn.dribbble.com/users/59947/screenshots/4217182/penguin-dribbble.gif',
          ],
          next: [
            {
              name: 'scuba',
              gifs: [
                'https://cdn.dribbble.com/users/448601/screenshots/5827556/__dribbble_ocean-4-800x600.gif',
                'https://cdn.dribbble.com/users/97602/screenshots/3341027/littlefish.gif',
              ],
              videoId: 'CEzSXX3tcmU',
            },
            {
              name: 'shore',
              gifs: [
                'https://cdn.dribbble.com/users/901963/screenshots/4012214/riverfinal.gif',
                'https://cdn.dribbble.com/users/3409004/screenshots/6443754/canoe6.gif',
              ],
              videoId: 'qWlU7hWEl8c',
            },
          ],
        },
      ],
      selected: null,
    };
    this.onSelection = this.onSelection.bind(this);
  }

  onSelection(event) {
    console.log(event.target.id, 'index');

    let targetState;
    if (this.state.selected) {
      targetState = this.state.selected[event.target.id].next;
      // ||
      // this.state.selected[event.target.id];
      console.log(targetState, 'what is target state');
    } else {
      targetState = this.state.options[event.target.id].next;
    }

    console.log(this.state, 'STATE IN MIDDLE');
    if (targetState) {
      this.setState({ selected: targetState, prompt: 'Choose one...' });
    } else {
      console.log(this.state.selected[event.target.id].videoId, 'what is this');
      return (
        // <Redirect
        //   to={{
        //     pathname: "/userHome",
        //     state: { video: this.state.selected[event.target.id].videoId }
        //   }}
        // />
        this.props.history.push({
          pathname: '/video',
          state: {
            video: this.state.selected[event.target.id].videoId,
          },
        })
      );
    }
    //eventually will make DB call for next option.
  }

  render() {
    // if (!this.state.selected) {
    let selected;
    this.state.selected
      ? (selected = this.state.selected)
      : (selected = this.state.options);
    return (
      <div className="quiz">
        <h1>{this.state.prompt}</h1>
        <div className="quizBox">
          {selected.map((option, index) => {
            const src =
              option.gifs[Math.floor(Math.random() * option.gifs.length)];
            return (
              <div className="optionBox" key={option.name}>
                <img
                  className="gif"
                  src={src}
                  alt={option.name}
                  id={index}
                  onClick={this.onSelection}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
    // } else {
    //   return (
    //     <QuizQuestions
    //       selections={this.state.selection}
    //       onClick={this.onSelection}
    //     />
    //   );
    // }
  }
}

export default Quiz;
