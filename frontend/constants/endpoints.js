const HOST = '192.168.205.11'; // Change this to the IPv4 address of the machine running the express server
const PORT = '3000';

export const GETLEAGUES_EP = 'http://' + HOST + ':' + PORT + '/leagues';
export const GETPLAYERSBYROLE_EP = 'http://' + HOST + ':'+ PORT + '/players/getByRole/';
export const GETMATCHUPSTOLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id +'/matchups'});
export const ADDPLAYERTOLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/addPlayer'});
export const GETPLAYERSINLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/players'});
export const GETROSTERINLEAGUE_EP = ((id,player) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/'+ player+'/roster'});
export const GETUSER_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/users/'+id});
