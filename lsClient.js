define(["LightstreamerClient", "StatusWidget"], function(LightstreamerClient, StatusWidget) {

  var hostToUse = document.location.protocol == "file:" ? "http://localhost:8080" : document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"");
  var lsClient= new LightstreamerClient(hostToUse, "MARIO");

  lsClient.addListener(new StatusWidget("left", "10px", true));

  lsClient.connect();

  window.lsClient = lsClient; //<-- get rid of it

  return lsClient;
});
