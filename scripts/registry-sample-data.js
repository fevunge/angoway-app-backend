"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = require("bcrypt");
var prisma = new client_1.PrismaClient();
function createSampleData() {
    return __awaiter(this, void 0, void 0, function () {
        var password, hashedPassword, users, drivers, orlando, laurentino, routes, stops, buses, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, 10, 12]);
                    password = '108449123Dss';
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 1:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, prisma.user.createMany({
                            data: [
                                {
                                    name: 'Dario',
                                    email: 'dario@gmail.com',
                                    number: '945193073',
                                    password: hashedPassword,
                                    role: 'USER',
                                },
                                {
                                    name: 'Pedro',
                                    email: 'pedro@gmail.com',
                                    number: '934945740',
                                    password: hashedPassword,
                                    role: 'USER',
                                },
                                {
                                    name: 'Rebeca',
                                    email: 'rebeca@gmail.com',
                                    number: '912345678', // Generated phone number
                                    password: hashedPassword,
                                    role: 'USER',
                                },
                                {
                                    name: 'Fernando',
                                    email: 'fernando@gmail.com',
                                    number: '923456789', // Generated phone number
                                    password: hashedPassword,
                                    role: 'ADMIN',
                                },
                            ]
                        })];
                case 2:
                    users = _a.sent();
                    return [4 /*yield*/, prisma.driver.createMany({
                            data: [
                                {
                                    name: 'Orlando',
                                    email: 'orlando@gmail.com',
                                    number: '911223344',
                                    password: hashedPassword,
                                },
                                {
                                    name: 'Laurentino',
                                    email: 'laurentino@gmail.com',
                                    number: '922334455',
                                    password: hashedPassword,
                                },
                            ],
                        })];
                case 3:
                    drivers = _a.sent();
                    console.log('Users created:', users.count);
                    console.log('Drivers created', drivers.count);
                    return [4 /*yield*/, prisma.driver.findUnique({
                            where: { email: 'orlando@gmail.com' },
                        })];
                case 4:
                    orlando = _a.sent();
                    return [4 /*yield*/, prisma.driver.findUnique({
                            where: { email: 'laurentino@gmail.com' },
                        })];
                case 5:
                    laurentino = _a.sent();
                    // Check if drivers were found
                    if (!orlando || !laurentino) {
                        console.error('Error: One or both drivers (Orlando, Laurentino) not found.');
                        throw new Error('Failed to find driver users.');
                    }
                    return [4 /*yield*/, prisma.route.createMany({
                            data: [
                                {
                                    name: 'Luanda Central to Viana',
                                    origin: 'Luanda Central',
                                    destination: 'Viana',
                                    departureTime: '08:00',
                                    estimatedTime: '01:00',
                                    arrivalTime: '09:00',
                                    status: 'active',
                                },
                                {
                                    name: 'Luanda Sul to Cacuaco',
                                    origin: 'Luanda Sul',
                                    destination: 'Cacuaco',
                                    departureTime: '07:30',
                                    estimatedTime: '01:30',
                                    arrivalTime: '09:00',
                                    status: 'active',
                                },
                                {
                                    name: 'Luanda to Talatona',
                                    origin: 'Luanda Central',
                                    destination: 'Talatona',
                                    departureTime: '09:00',
                                    estimatedTime: '00:45',
                                    arrivalTime: '09:45',
                                    status: 'active',
                                },
                                {
                                    name: 'Luanda to Kilamba',
                                    origin: 'Luanda Central',
                                    destination: 'Kilamba',
                                    departureTime: '10:00',
                                    estimatedTime: '01:15',
                                    arrivalTime: '11:15',
                                    status: 'active',
                                },
                                {
                                    name: 'Luanda to Benfica',
                                    origin: 'Luanda Central',
                                    destination: 'Benfica',
                                    departureTime: '11:00',
                                    estimatedTime: '01:00',
                                    arrivalTime: '12:00',
                                    status: 'active',
                                },
                            ],
                        })];
                case 6:
                    routes = _a.sent();
                    console.log('Routes created:', routes.count);
                    return [4 /*yield*/, prisma.stop.createMany({
                            data: [
                                // Stops for Orlando's route (Luanda Central to Viana, routeId: 1)
                                { name: 'Mutamba', routeId: 1 },
                                { name: 'Rocha Pinto', routeId: 1 },
                                { name: 'Vila de Viana', routeId: 1 },
                                // Stops for Laurentino's route (Luanda Sul to Cacuaco, routeId: 2)
                                { name: 'Calemba', routeId: 2 },
                                { name: 'Kikolo', routeId: 2 },
                                { name: 'Cacuaco Centro', routeId: 2 },
                                // Stops for other routes
                                { name: 'Talatona Centro', routeId: 3 },
                                { name: 'Kilamba Central', routeId: 4 },
                                { name: 'Benfica Praia', routeId: 5 },
                                { name: 'Cidade do Kilamba', routeId: 4 },
                            ],
                        })];
                case 7:
                    stops = _a.sent();
                    console.log('Stops created:', stops.count);
                    return [4 /*yield*/, prisma.bus.createMany({
                            data: [
                                {
                                    matricula: 'LDA-123-45',
                                    driverId: orlando.id,
                                    routeId: 1, // Luanda Central to Viana
                                    status: 'IN_TRANSIT',
                                    capacity: 50,
                                    currentLoad: 30,
                                    location: 'Mutamba, Luanda',
                                },
                                {
                                    matricula: 'LDA-678-90',
                                    driverId: laurentino.id,
                                    routeId: 2, // Luanda Sul to Cacuaco
                                    status: 'IN_TRANSIT',
                                    capacity: 40,
                                    currentLoad: 25,
                                    location: 'Calemba, Luanda',
                                },
                            ],
                        })];
                case 8:
                    buses = _a.sent();
                    console.log('Buses created:', buses.count);
                    console.log('Sample data created successfully.');
                    return [3 /*break*/, 12];
                case 9:
                    error_1 = _a.sent();
                    console.error('Error creating sample data:', error_1);
                    throw error_1;
                case 10: return [4 /*yield*/, prisma.$disconnect()];
                case 11:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
createSampleData().catch(function (error) {
    console.error(error);
    process.exit(1);
});
