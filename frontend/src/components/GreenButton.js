import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function GreenButton({ title }) {
  const styles = useStyles();
  return (
    <button type="submit" className={styles.mainButton}>
      {title}
    </button>
  );
}

const useStyles = makeStyles({
  mainButton: {
    backgroundColor: '#2b8505',
    color: 'white',
    padding: 14,
    marginTop: 8,
    cursor: 'pointer',
    width: '100%',
    borderRadius: '20px',
    borderWidth: 0,
  },
});
