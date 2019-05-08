import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_VIDEO, GET_ALL_VIDEOS } from '../../queries';
import Error from '../Error';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import CKEditor from 'react-ckeditor-component';

class AddVideo extends React.Component {
  state = {
    name: '',
    imageUrl: '',
    instructions: '',
    category: 'Eagles',
    description: '',
    username: ''
  };
  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleEditorChange = event => {
    const newContent = event.editor.getData();
    this.setState({
      instructions: newContent
    });
  };
  handleSubmit = (event, addVideo) => {
    event.preventDefault();
    addVideo().then(({ data }) => {
      this.setState({
        name: '',
        imageUrl: '',
        instructions: '',
        category: 'Eagles',
        description: '',
        username: ''
      });
      this.props.history.push('/');
    });
  };
  validateForm = () => {
    const { name, imageUrl, category, description, instructions } = this.state;
    const isInvalid =
      !name || !imageUrl || !category || !description || !instructions;
    return isInvalid;
  };

  updateCache = (cache, { data: { addVideo } }) => {
    const { getAllVideos } = cache.readQuery({ query: GET_ALL_VIDEOS });

    cache.writeQuery({
      query: GET_ALL_VIDEOS,
      data: {
        getAllVideos: [addVideo, ...getAllVideos]
      }
    });
  };

  render() {
    const {
      name,
      imageUrl,
      category,
      description,
      instructions,
      username
    } = this.state;
    return (
      <Mutation
        mutation={ADD_VIDEO}
        variables={{
          name,
          imageUrl,
          category,
          description,
          instructions,
          username
        }}
        refetchQueries={() => [
          { query: GET_ALL_VIDEOS, variables: { username } }
        ]}
        update={this.updateCache}
      >
        {(addVideo, { data, loading, error }) => {
          return (
            <div className='App'>
              <h2 className='App'>Add Video</h2>
              <form
                className='form'
                onSubmit={event => this.handleSubmit(event, addVideo)}
              >
                <input
                  type='text'
                  name='name'
                  placeholder='Video Name'
                  onChange={this.handleChange}
                  value={name}
                />
                <input
                  type='text'
                  name='imageUrl'
                  placeholder='Video Image'
                  onChange={this.handleChange}
                  value={imageUrl}
                />
                <select
                  name='category'
                  onChange={this.handleChange}
                  value={category}
                >
                  <option value='Eagles'>Eagles</option>
                  <option value='Sea'>Sea</option>
                  <option value='Land'>Land</option>
                  <option value='Sky'>Sky</option>
                </select>
                <input
                  type='text'
                  name='description'
                  placeholder='Add description'
                  onChange={this.handleChange}
                  value={description}
                />
                <label htmlFor='instructions'>Add Instructions</label>
                <CKEditor
                  name='instructions'
                  content={instructions}
                  events={{ change: this.handleEditorChange }}
                />
                {/* <textarea
                  name='instructions'
                  placeholder='Add instructions'
                  onChange={this.handleChange}
                  value={instructions}
                /> */}
                <button
                  disabled={loading || this.validateForm()}
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
  withRouter(AddVideo)
);
