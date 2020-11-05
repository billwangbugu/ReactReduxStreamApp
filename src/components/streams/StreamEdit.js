import React from "react";
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions/index';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          //initialValues={this.props.stream} //this is not good because userId, id should not pass to server
          // initialValues={{ title: this.props.stream.title, description:this.props.stream.description }} //this is an option
          initialValues={_.pick(this.props.stream, 'title', 'description')} //use lodash
          onSubmit={this.onSubmit} />
      </div>
    );
  }

};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
