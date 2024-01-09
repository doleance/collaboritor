module.exports = {
    startWatch
}
 
function startWatch(app) {
    console.log('itt nem vagyok')
        const liveReload = require('livereload');
        const connectLiveReload = require('connect-livereload');
    
        const liveReloadServer = liveReload.createServer();
        liveReloadServer.server.once("connection", () => {
          setTimeout(() => {
            liveReloadServer.refresh("/");
          }, 100);
        });
    
        app.use(connectLiveReload());
}