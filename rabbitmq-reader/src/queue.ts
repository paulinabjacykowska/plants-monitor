import amqp, { Channel, ConsumeMessage, Connection } from 'amqplib';

/**
 * Class which represent RabbitMQ queue
 */
class Queue {
  readonly CONFIG = {
    protocol: 'amqp',
    hostname: process.env.IP_ADDRESS,
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanizm: ['PLAIN', 'AMQPLAIN', 'EXTERNAL'],
  };
  readonly QUEUE = 'plant_sensor';
  readonly RECONNECT_TIMEOUT = 5000;

  private _connection: Connection | null = null;
  private _channel: Channel | null = null;

  /**
   * Creates connection to channel with RabbitMQ queue
   * @returns {void} Nothing
   */
  connect = async (): Promise<void> => {
    try {
      this._connection = await amqp.connect(this.CONFIG);
      console.log('Connection created...');

      this._channel = await this._connection.createChannel();
      console.log('Channel created...');
    } catch (error) {
      console.error(`Error -> ${error}`);
      setTimeout(this.connect, this.RECONNECT_TIMEOUT);
    }
  };

  /**
   * Reads message to RabbitMQ queue
   * @param callback - Message to be read
   * @returns {boolen} - Whether the message was read successfully
   */
  async consume(
    callback: (msg: ConsumeMessage | null) => void
  ): Promise<boolean> {
    if (!this._channel) return false;

    await this._channel.assertQueue(this.QUEUE);
    await this._channel.consume(this.QUEUE, async (message) => {
      await callback(message);
      message && this._channel?.ack(message);
    });

    return true;
  }
}

const queue = new Queue();

export default queue;
