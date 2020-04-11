const HOST = '54.174.209.143'; // Change this to the IPv4 address of the machine running the express server
const PORT = '3000';

export const GETUSER_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/users/'+id});

// Leagues
export const GETLEAGUES_EP = 'http://' + HOST + ':' + PORT + '/leagues';
export const GETMATCHUPSTOLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id +'/matchups'});
export const ADDPLAYERTOLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/addPlayer'});
export const REMOVEPLAYERFROMLEAGUE_EP = ((id, uid) => {return 'http://' + HOST + ':' + PORT + '/leagues/' + id+ '/removePlayer/' + uid});
export const ADDPROTOLEAGUE_EP = ((id, uid) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/'+uid+'/addPro'});
export const GETPLAYERSINLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/players'});

export const GETROSTERINLEAGUE_EP = ((id,player) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/'+ player+'/roster'});


// Pros
export const GETPLAYERSBYROLE_EP = 'http://' + HOST + ':'+ PORT + '/players/getByRole/';
export const GETPROSINLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/getPros'});
