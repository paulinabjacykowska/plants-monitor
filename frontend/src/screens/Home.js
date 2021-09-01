import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import flower1 from '../images/flower1.png';
import flower2 from '../images/flower2.png';
import flower3 from '../images/flower3.png';
import NavigationBar from '../components/NavigationBar';

export default function Home() {
  const styles = useStyles();
  return (
    <div className={styles.home}>
      <NavigationBar LeftTitle="Home" />
      <div className={styles.backgroundImage}>
        <h1 className={styles.centerTilte}>Uprawa roślin</h1>
      </div>
      <div className={styles.middleSecion}>
        <div className={styles.text}>
          <h2>Nasz cel</h2>
          <p>
            Naszym celem jest w pomoc w uprawie roślin wszystkim miłośnikom
            domowej zieleni. Na tej stronie znajdziesz listę dostępnych roślin,
            opisów ich uprawy. Po zarejetrowaniu możesz sam monitorować uprawę
            twoich ulubionych roślin i sprawdzać czego potrzebują.
          </p>
        </div>
        <div className={styles.photos}>
          <div className={styles.row}>
            <img src={flower1} className={styles.flower} alt="roślina" />
            <img src={flower2} className={styles.flower} alt="roślina" />
          </div>
          <div>
            <img src={flower3} className={styles.flower} alt="roślina" />
          </div>
        </div>
      </div>
    </div>
  );
}
const useStyles = makeStyles({
  home: {},
  backgroundImage: {
    backgroundImage: 'url(/backgroundImage.png)',
    width: '100%',
    height: 500,
    color: '#2B8505',
    backgroundSize: 'cover',
    verticalAlign: 'middle',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    float: 'right',
    display: 'flex',
    height: 15,
  },
  extraMargin: {
    marginRight: 10,
    marginTop: 10,
  },
  middleSecion: {
    display: 'flex',
    float: 'left',
    backgroundColor: 'white',
    padding: 20,
  },
  text: {
    width: '50%',
    padding: '50px 60px 0px 60px',
  },
  photos: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
  },
});
