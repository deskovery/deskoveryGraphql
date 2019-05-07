import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_QUIZ, GET_ALL_QUIZZES } from '../../queries';
import Error from '../Error';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
// import CKEditor from 'react-ckeditor-component';

class AddQuiz extends React.Component {
  state = {
      name: '',
      gifs: ''

  };
  // componentDidMount() {
  //   this.setState({
  //     username: this.props.session.getCurrentUser.username
  //   });
  // }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  // handleEditorChange = event => {
  //   const newContent = event.editor.getData();
  //   this.setState({
  //     instructions: newContent
  //   });
  // };
  handleSubmit = (event, addQuiz) => {
    event.preventDefault();
    addQuiz().then(({ data }) => {
      this.setState({

            name: '',
            gifs: '',

      });
      this.props.history.push('/');
    });
  };
  // validateForm = () => {
  //    const { options.name } = this.state;
  //   const isInvalid =
  //     !name || !imageUrl || !category || !description || !instructions;
  //   return isInvalid;
  // };

  updateCache = (cache, { data: { addQuiz } }) => {
    const { getAllQuizzes } = cache.readQuery({ query: GET_ALL_QUIZZES });

    cache.writeQuery({
      query: GET_ALL_QUIZZES,
      data: {
        getAllQuizzes: [addQuiz, ...getAllQuizzes]
      }
    });
  };

  render() {
    const {
      name,
      gifs,


    } = this.state;
    return (
      <Mutation
        mutation={ADD_QUIZ}
        variables={{
          name,
          gifs,

        }}
        // refetchQueries={() => [
        //   { query: GET_USER, variables: { username } }
        // ]}
        // update={this.updateCache}
      >
        {(addQuiz, { data, loading, error }) => {
          return (
            <div className='App'>
              <h2 className='App'>Add Quiz</h2>
              <form
                className='form'
                onSubmit={event => this.handleSubmit(event, addQuiz)}
              >
                <input
                  type='text'
                  name='name'
                  placeholder='Quiz Name'
                  onChange={this.handleChange}
                  value={name}
                />
                <input
                  type='text'
                  name='gifs'
                  placeholder='Video Gifs'
                  onChange={this.handleChange}
                  value={gifs}
                />
                {/* // <input
                //   type='text'
                //   name='next'
                //   placeholder='next'
                //   onChange={this.handleChange}
                //   value={next}
                // /> */}

                <button
                  disabled={loading}
                  type='submit'
                  className='btn-primary'
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddQuiz)
);


