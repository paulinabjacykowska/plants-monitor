import amqp, { Channel } from 'amqplib';

const rabbitSettings = {
  protocol: 'amqp',
  hostname: process.env.IP_ADDRESS,
  port: 5672,
  username: 'guest',
  password: 'guest',
  vhost: '/',
  authMechanizm: ['PLAIN', 'AMQPLAIN', 'EXTERNAL'],
};

/**
 * Class which represents a RabbitMQ sender
 */
class RabbitMQSender {
  private _channel: Channel | null = null;
  private _queue = 'plant_sensor';
  readonly RECONNECT_TIMEOUT = 5000;

  /**
   * Creates connection to channel with RabbitMQ queue
   * @returns {void} Nothing
   */
  connect = async (): Promise<void> => {
    try {
      const conn = await amqp.connect(rabbitSettings);
      console.log('Connection created...');

      this._channel = await conn.createChannel();
      console.log('Channel created...');

      await this._channel.assertQueue(this._queue);
      console.log('Queue created...');
    } catch (err) {
      console.error(`Error -> ${err}`);
      setTimeout(this.connect, this.RECONNECT_TIMEOUT);
    }
  };

  /**
   * Sends message to RabbitMQ queue
   * @param messages - Message to be sent to the queue
   * @returns {boolean} - Whether the message was sent successfully
   */
  send = async (messages: any): Promise<boolean> => {
    try {
      if (this._channel) {
        this._channel.sendToQueue(
          this._queue,
          Buffer.from(JSON.stringify(messages))
        );
        console.log(`Message sent to  queue ${this._queue}`);
        return true;
      }
    } catch (err) {
      console.error(`Error -> ${err}`);
    }
    return false;
  };
}

const sender = new RabbitMQSender();

export default sender;
