define(["LightstreamerClient", "StatusWidget"], function(LightstreamerClient, StatusWidget) {

  var protocolToUse = document.location.protocol != "file:" ? document.location.protocol : "http:";
  var lsClient = new LightstreamerClient(protocolToUse+"//localhost:8080","MARIO");

  lsClient.addListener(new StatusWidget("left", "10px", true));

  lsClient.connect();

  window.lsClient = lsClient; //<-- get rid of it

  return lsClient;
});
