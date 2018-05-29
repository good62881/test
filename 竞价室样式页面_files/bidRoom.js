
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (bidRoom == null) var bidRoom = {};
bidRoom._path = '/dwr';
bidRoom.init = function(p0, p1, p2, callback) {
  dwr.engine._execute(bidRoom._path, 'bidRoom', 'init', p0, p1, p2, callback);
}
bidRoom.isConnect = function(p0, callback) {
  dwr.engine._execute(bidRoom._path, 'bidRoom', 'isConnect', p0, callback);
}
bidRoom.getPacksFromProj = function(p0, callback) {
  dwr.engine._execute(bidRoom._path, 'bidRoom', 'getPacksFromProj', p0, callback);
}
bidRoom.getPacksByProjBidder = function(p0, p1, callback) {
  dwr.engine._execute(bidRoom._path, 'bidRoom', 'getPacksByProjBidder', p0, p1, callback);
}
bidRoom.getHereOr = function(p0, p1, p2, callback) {
  dwr.engine._execute(bidRoom._path, 'bidRoom', 'getHereOr', p0, p1, p2, callback);
}
bidRoom.here = function(p0, p1, p2, p3, p4, callback) {
  dwr.engine._execute(bidRoom._path, 'bidRoom', 'here', p0, p1, p2, p3, p4, callback);
}
bidRoom.getPakageBidder = function(p0, p1, callback) {
  dwr.engine._execute(bidRoom._path, 'bidRoom', 'getPakageBidder', p0, p1, callback);
}
bidRoom.getBidderDetailInfor = function(p0, callback) {
  dwr.engine._execute(bidRoom._path, 'bidRoom', 'getBidderDetailInfor', p0, callback);
}
bidRoom.getCurrentRoomSessions = function(p0, p1, callback) {
  dwr.engine._execute(bidRoom._path, 'bidRoom', 'getCurrentRoomSessions', p0, p1, callback);
}
