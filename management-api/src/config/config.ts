import dotenv from 'dotenv';

dotenv.config();

export default {
  SERVER_TOKEN_EXPIRETIME: process.env.SERVER_TOKEN_EXPIRETIME || 3600,
  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET ||
    'e7fb545f517cec702faa4391b9e723f822c242fede74cbb375d5330eb0c00dc2aa18bbdee19dac16bb15cbe910013400697bae90420c5cf1208484cee4e18d44',
  ACCESS_TOKEN_SECRET:
    process.env.ACCESS_TOKEN_SECRET ||
    'a06885ed8bc3013ca1adf4df6278807d9837fb958bd2dc524b84096d2992d214e683a08a5cec885e9d644d6ece389b827ab58476b69dba4f38bc61f5acb334cb',
};
