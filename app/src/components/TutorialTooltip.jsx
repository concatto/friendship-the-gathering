import React from 'react';
import {
  Tooltip, Typography, Button, Paper, withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Box from './Box';

const tutorialTooltipKey = 'tutorialTooltipHidden';

export const hideTutorialTooltip = () => {
  window.localStorage.setItem(tutorialTooltipKey, true);
};

export const isTutorialTooltipHidden = () => (
  window.localStorage.getItem(tutorialTooltipKey) === 'true'
);

const BaseTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: 'transparent',
    filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.4))',
    marginTop: 0,
  },
  popper: {
    opacity: 1,
  },
}))(Tooltip);

class TutorialTooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shown: false,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ shown: true }), 500);
  }

  render() {
    const {
      content, uniqueId, ...rest
    } = this.props;

    function hide() {
      this.setState({ shown: false });
      hideTutorialTooltip();
    }

    const boundHide = hide.bind(this);

    function Content() {
      return (
        <>
          <Box position="relative" style={{ zIndex: -1, marginBottom: -4 }} crossAlign="center">
            <span style={{
              fontSize: 40, color: 'white', transform: 'scaleX(3.5)',
            }}
            >▲
            </span>
          </Box>
          <Box crossAlign="center" style={{ backgroundColor: 'white' }}>
            <Box padding="1">
              <Box padding="1 1 0">
                <Typography>
                  {content}
                </Typography>
              </Box>
              <Box crossAlign="flex-end">
                <Button color="secondary" onClick={() => boundHide()}>
                  Entendi
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      );
    }

    console.log(isTutorialTooltipHidden());
    return (
      <BaseTooltip
        title={<Content />}
        open={this.state.shown && !isTutorialTooltipHidden()}
        interactive
        placement="bottom"
        {...rest}
      />
    );
  }
}

TutorialTooltip.propTypes = {
  children: PropTypes.any,
  content: PropTypes.any,
  uniqueId: PropTypes.any,
};

export default TutorialTooltip;
