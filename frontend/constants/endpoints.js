const HOST = '192.168.205.11'; // Change this to the IPv4 address of the machine running the express server
const PORT = '3000';

export const GETUSER_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/users/'+id});

// Leagues
export const GETLEAGUES_EP = 'http://' + HOST + ':' + PORT + '/leagues';
export const GETMATCHUPSTOLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id +'/matchups'});
export const ADDPLAYERTOLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/addPlayer'});
export const REMOVEPLAYERFROMLEAGUE_EP = ((id, uid) => {return 'http://' + HOST + ':' + PORT + '/leagues/' + id+ '/removePlayer/' + uid});
export const ADDPROTOLEAGUE_EP = ((id, uid) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/'+uid+'/addPro'});
export const GETPLAYERSINLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/players'});
export const GETROSTERINLEAGUE_EP = ((id,player) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/'+ player+'/specific'});
export const GETROSTERINLEAGUEWITHUID_EP = ((id,uid) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/'+ uid+'/id'});

//Matchups 
export const CREATEMATCHUPSTOLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+ '/createMatchup'});

// Pros
export const GETPLAYERSBYROLE_EP = 'http://' + HOST + ':'+ PORT + '/players/getByRole/';
export const GETPROSINLEAGUE_EP = ((id) => {return 'http://' + HOST + ':' + PORT + '/leagues/'+id+'/getPros'});
export const GETPROSBYIGN_EP = ((ign) => {return 'http://' + HOST + ':' + PORT + '/players/'+'/getByIgn/'+ign});
