import React from 'react';
import { Tooltip, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Box from './Box';

class TutorialTooltip extends React.Component {
  render() {
    const {
      content, uniqueId, ...rest
    } = this.props;

    function Content() {
      return (
        <Box>
          <Typography>
            {content}
          </Typography>
          <Box crossAlign="flex-end">
            <Button color="primary">
              Entendi
            </Button>
          </Box>
        </Box>
      );
    }

    return (
      <Tooltip title={<Content />} open placement="top" {...rest} />
    );
  }
}

TutorialTooltip.propTypes = {
  children: PropTypes.any,
  content: PropTypes.any,
  uniqueId: PropTypes.any,
};

export default TutorialTooltip;
