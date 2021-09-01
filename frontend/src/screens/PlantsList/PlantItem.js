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

export default function PlantItem({ plant, onEdit, onRemove }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary aria-controls="panel1c-content" id="panel1c-header">
          <div className={classes.column}>
            <Typography className={classes.heading}>{plant.name}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <p style={{ marginRight: 5 }}>
            By dowiedzieć się więcej o swojej roślinie kliknij:
          </p>
          <Link
            to={{
              pathname: `/plant/${plant._id}`,
            }}
          >
            {plant.name}
          </Link>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" color="primary" onClick={onEdit}>
            Edytuj
          </Button>
          <ConfirmationModal
            content="Czy napewno chcesz usunąć tę roślinę?"
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: 12,
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
  column: {
    flexBasis: '33.33%',
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
