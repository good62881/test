
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (bid == null) var bid = {};
bid._path = '/dwr';
bid.fInit = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(bid._path, 'bid', 'fInit', p0, p1, p2, p3, callback);
}
bid.fSendAll = function(p0, callback) {
  dwr.engine._execute(bid._path, 'bid', 'fSendAll', p0, callback);
}
bid.fBid = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(bid._path, 'bid', 'fBid', p0, p1, p2, p3, callback);
}
