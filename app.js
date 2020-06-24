var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

const tables = [
    {
        name: "John Doe",
        number: "222-222-2222",
        email: "john@test.com",
        reservationTime: 8,
    },
];

const waitlist = [
    {
        name: "Jane Doe",
        number: "222-222-2222",
        email: "jane@test.com",
        reservationTime: 10,
    },
];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

app.post("/api/tables", function (req, res) {
    var newReservation = req.body;

    if (tables.length > 5) {
        waitlist.push(newReservation);
    } else {
        tables.push(newReservation);
    }

    console.log(newReservation);
    res.json(newReservation);
});

app.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`);
});
