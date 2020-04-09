const HOST = '192.168.1.69'; // Change this to the IPv4 address of the machine running the express server
const PORT = '3000';

export const GETLEAGUES_EP = 'http://' + HOST + ':' + PORT + '/leagues';
export const GETPLAYERSBYROLE_EP = 'http://' + HOST + ':'+ PORT + '/players/getByRole/';
export const ADDPLAYERTOLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/addPlayer'});
export const REMOVEPLAYERFROMLEAGUE_EP = ((id, uid) => {return 'http://' + HOST + ':' + PORT + '/leagues/' + id+ '/removePlayer/' + uid});
export const ADDPROTOLEAGUE_EP = ((id, uid) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/'+uid+'/addPro'});
export const GETPLAYERSINLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/players'});
export const GETUSER_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/users/'+id});