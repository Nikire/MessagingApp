import { io } from 'socket.io-client';
import { BACKEND_ORIGIN } from './_config';

// I usually use dotenv to determine which URL I want to use to connect.
const socket = io(BACKEND_ORIGIN);

export default socket;
