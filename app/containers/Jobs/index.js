import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';

import filter from 'lodash/filter';
import ExecutingJobs from 'components/ExecutingJobs'
import SimpleTable from 'components/SimpleTable';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {  
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';

import { loadJobs } from './actions';
import { makeSelectJobs } from './selectors';

import reducer from './reducer';
import saga from './saga';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  chartContainer: {
    marginLeft: -22,
  },
  
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}
/* eslint-disable react/prefer-stateless-function */
export class JobsPage extends React.PureComponent {
  
  componentDidMount() {
    const { onInit } = this.props;
    onInit();
  }

  state = {
    activeStep: 0,
    skipped: new Set(),
  };

  isStepOptional = step => step === 1;

  isStepFailed = step => step === 1;

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes, jobs } = this.props;
    const executingJobs = filter(jobs, (j) => j.executing);        
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <div>
        <ExecutingJobs jobs={jobs || []} />
        <Typography variant="display1" gutterBottom style={{ marginTop: 30 }}>
          Fluxos
        </Typography>
        { jobs && <div className={styles.tableContainer}>
          <SimpleTable data={filter(jobs, (j) => !j.executing)}/>
        </div>}
      </div>
    );
  }
}

JobsPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  jobs: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onInit: PropTypes.func,  
  classes: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onInit: () => {
      dispatch(loadJobs());
    },
  };
}

const mapStateToProps = createStructuredSelector({  
  jobs: makeSelectJobs(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withStyles(styles),
  withReducer,
  withSaga,
  withConnect,
)(JobsPage);
