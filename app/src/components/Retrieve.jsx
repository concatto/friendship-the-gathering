import React, { Component } from 'react';
import { gatherResults } from '../database';

class Retrieve extends Component {
  render() {
    const { match } = this.props;
    gatherResults(match.params.id);

    return (
      <div>
        :)
      </div>
    );
  }
}

export default Retrieve;
