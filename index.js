var http = require('http');
var Datastore = require('nedb');
var db = new Datastore({ inMemoryOnly: true });
var ODataServer = require('simple-odata-server');
var Adapter = require('simple-odata-server-nedb');

var model = {
    namespace: "travel",
    entityTypes: {
        // "UserType": {
        //     "_id": {"type": "Edm.String", key: true},
        //     "test": {"type": "Edm.String"},            
        // }
        "Booking": {
            "Carrid": { "type": "Edm.String", key: true },
            "Connid": { "type": "Edm.String", key: true },
            "Fldate": { "type": "Edm.String", key: true },
            "Bookid": { "type": "Edm.String", key: true },
            "Passname": { "type": "Edm.String" },
            "Reserved": { "type": "Edm.String" },
            "Cancelled": { "type": "Edm.String" },
            "Class": { "type": "Edm.String" },
            "Counter": { "type": "Edm.String" },
            "Customid": { "type": "Edm.String" },
            "OrderDate": { "type": "Edm.DateTime" }
        },
        "Carrier": {
            "Carrid": { "type": "Edm.String", key: true },
            "Carrname": { "type": "Edm.String" },
            "Currcode": { "type": "Edm.String" },
            "Url": { "type": "Edm.String" }
        },
        "Connection": {
            "Carrid": { "type": "Edm.String", key: true },
            "Connid": { "type": "Edm.String", key: true },
            "Cityfrom": { "type": "Edm.String" },
            "Airpfrom": { "type": "Edm.String" },
            "Cityto": { "type": "Edm.String" },
            "Airpto": { "type": "Edm.String" },
            "Deptime": { "type": "Edm.Time" },
            "Arrtime": { "type": "Edm.Time" },
        }
    },
    entitySets: {
        "Bookings": {
            entityType: "travel.Booking"
        },
        "Carriers": {
            entityType: "travel.Carrier"
        },
        "Connections": {
            entityType: "travel.Connection"
        }
    }
};
var port = process.env.PORT || 1337;
var url = process.env.ROOT_URL_S || process.env.ROOT_URL_S || "http://localhost";
var odataServer = ODataServer(url)
    .model(model)
    .adapter(Adapter(function (es, cb) { cb(null, db) }));

    //Setting cors
odataServer.cors('*')

http.createServer(odataServer.handle.bind(odataServer)).listen(port);
console.log("Listening " + port);