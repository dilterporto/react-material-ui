import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import filter from 'lodash/filter';

const styles = theme => ({
  tableContainer: {
    width: 100,
    height: 320,
  },
  column: {
    flexBasis: '33.33%',
  },
  colorPrimary: {
    backgroundColor: '#B2DFDB',
  },
  barColorPrimary: {
    backgroundColor: '#00695C',
  },
});

function ExecutingJobs(props) {
    const { jobs, classes } = props;    
    const executingJobs = filter(jobs, (j) => j.executing);
    return (
        <div>
            <Typography variant="display1" gutterBottom>
                Em execução
            </Typography>
            <div className={styles.tableContainer}>
                {executingJobs.map((ej) => {
                    return (
                        <ExpansionPanel defaultExpanded>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <div className={classes.column}>
                                    <Typography className={classes.heading}>
                                        <CircularProgress size={20} /> {ej.description}
                                    </Typography>
                                </div>
                                <div className={classes.column}>
                                    <Chip
                                        label={ej.group}
                                        className={classes.chip}
                                        variant="outlined"
                                    />
                                </div>
                            </ExpansionPanelSummary>                            
                            <Divider />
                            <ExpansionPanelActions>
                                <Button size="small" color="secondary">Cancel</Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    )
                })}
                {executingJobs.length > 0 && <LinearProgress
                    classes={{
                        colorPrimary: classes.colorPrimary,
                        barColorPrimary: classes.barColorPrimary,
                    }}
                />}
            </div>
        </div>
    );
}

ExecutingJobs.propTypes = {
    jobs: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    classes: PropTypes.object,
};

export default withStyles(styles)(ExecutingJobs);
