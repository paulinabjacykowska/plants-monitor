import Simulator from './simulator';
import sender from './sender';

(async () => {
  const { DEVICE_NUMBER, IP_ADDRESS } = process.env;
  if (!DEVICE_NUMBER) {
    console.log('Pass DEVICE_NUMBER in .env');
    return;
  }
  if (!IP_ADDRESS) {
    console.log('Pass IP_ADDRESS in .env');
    return;
  }

  await sender.connect();

  const simulator = new Simulator(DEVICE_NUMBER, 5000);
  simulator.simulate(sender.send);
})();
