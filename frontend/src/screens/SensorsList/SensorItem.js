import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ConfirmationModal from '../../components/ConfirmationModal';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '40%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function SensorItem({ sensor, onEdit, onRemove }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary aria-controls="panel1c-content" id="panel1c-header">
          <div className={classes.column}>
            <Typography className={classes.heading}>{sensor.name}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Podłączony do:{' '}
              <Link to={`/plant/${sensor.plant._id}`}>{sensor.plant.name}</Link>
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <p>ID urządzenia: </p>
          <p style={{ color: 'gray', marginLeft: 5 }}>#{sensor.deviceNumber}</p>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" color="primary" onClick={onEdit}>
            Edytuj
          </Button>
          <ConfirmationModal
            content="Czy napewno chcesz usunąć ten czujnik?"
            confirmText="Usuń"
            cancelText="Anuluj"
          >
            {confirmRemove => (
              <Button size="small" onClick={confirmRemove(onRemove)}>
                Usuń
              </Button>
            )}
          </ConfirmationModal>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
