const HOST = '192.168.1.69'; // Change this to the IPv4 address of the machine running the express server
const PORT = '3000';

export const GETLEAGUES_EP = 'http://' + HOST + ':' + PORT + '/leagues';
export const GETPLAYERSBYROLE_EP = 'http://' + HOST + ':'+ PORT + '/players/getByRole/';