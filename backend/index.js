const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const connection = require('./connection.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AdminRouter = require('./routers/AdminRouters/AdminRouters.js');
const BranchRouter = require('./routers/AdminRouters/BranchRouter.js');
const BranchAdminRouter = require('./routers/BranchAdminRouter/BranchAdminRouters.js');
const MenuRouter = require('./routers/MenuRouter.js');
const RestroRouter = require('./routers/RestroRouter/RestroRouter.js');
const TableRouter = require('./routers/TableRouter.js');
const RestaurantRouter = require('./routers/RestaurantRouter.js');
const http = require('http')
const { Server } = require("socket.io");

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: (origin, callback) => {
        const whitelist = ['http://localhost:5173'];
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use(express.static("./public"));

// Admin Routers
app.use("/admin", AdminRouter)
app.use('/branch', BranchRouter)
app.use('/menu', MenuRouter)
app.use('/table', TableRouter)

app.use("/branch", BranchAdminRouter)

app.use('/restro', RestroRouter)

app.use('/restaurant', RestaurantRouter)


// ✅ Step 1: create HTTP server
const server = http.createServer(app);
// Server + Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // frontend ka URL
        methods: ["GET", "POST"],
        credentials: true
    }
});

// socket ko global pass karna
app.set("io", io);

// socket connection
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinBranch", (branchId) => {
        socket.join(`branch-${branchId}`);
        console.log(`Socket ${socket.id} joined branch-${branchId}`);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});







connection()
    .then(
        () => {
            console.log("db connected sucessfully");
            server.listen(
                5000,
                () => { console.log("server start : 5000") }
            )
        }
    )
    .catch(
        () => {
            console.log("DB not connected");
        }
    )
