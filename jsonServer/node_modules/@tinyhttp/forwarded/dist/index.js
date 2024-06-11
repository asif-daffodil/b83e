function forwarded(req) {
  const proxyAddrs = parse(req.headers["x-forwarded-for"] || "");
  const socketAddr = req.socket.remoteAddress;
  return [socketAddr].concat(proxyAddrs);
}
function parse(header) {
  let end = header.length;
  const list = [];
  let start = header.length;
  for (let i = header.length - 1; i >= 0; i--) {
    switch (header.charCodeAt(i)) {
      case 32:
        if (start === end) {
          start = end = i;
        }
        break;
      case 44:
        if (start !== end) {
          list.push(header.substring(start, end));
        }
        start = end = i;
        break;
      default:
        start = i;
        break;
    }
  }
  if (start !== end)
    list.push(header.substring(start, end));
  return list;
}
export {
  forwarded,
  parse
};
//# sourceMappingURL=index.js.map
