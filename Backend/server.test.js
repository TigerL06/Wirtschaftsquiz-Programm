const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./server'); // Importiere die Express-App
const http = require('http'); // HTTP-Server erstellen

jest.setTimeout(30000); // Timeout auf 30 Sekunden erhöhen

let mongoServer;
let server;

// Vor den Tests: In-Memory MongoDB starten und Server initialisieren
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    server = http.createServer(app); // HTTP-Server erstellen
    server.listen(4000); // Server explizit auf Port 4000 starten
});

// Nach jedem Test: Server schließen
afterEach(() => {
    if (server && server.listening) {
        server.close();
    }
});

// Nach den Tests: Verbindung schließen und Server stoppen
afterAll(async () => {
    if (server && server.listening) {
        server.close();
    }
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('API Endpoints Tests', () => {
    // Test für GET /collections
    test('GET /collections - sollte alle Sammlungen abrufen', async () => {
        const res = await request(server).get('/collections');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test für GET /questions
    test('GET /questions - sollte alle Fragen abrufen', async () => {
        const res = await request(server).get('/questions');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test für GET /questions/:id
    test('GET /questions/:id - sollte eine Frage mit einer spezifischen ID abrufen', async () => {
        const question = await mongoose.connection.db.collection('fragens').insertOne({
            frageID: '123',
            frage: 'Was ist 2 + 2?',
            antwort: '4',
            modus: 'normal',
        });

        const res = await request(server).get(`/questions/${question.insertedId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.frage).toBe('Was ist 2 + 2?');
    });

    // Test für POST /collections
    test('POST /collections - sollte eine neue Sammlung erstellen', async () => {
        const res = await request(server)
            .post('/collections')
            .send({
                name: 'Test Sammlung',
                type: 'Fragesammlung',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Test Sammlung');
    });

    // Test für POST /questions
    test('POST /questions - sollte eine neue Frage erstellen', async () => {
        const res = await request(server)
            .post('/questions')
            .send({
                frageID: '12345',
                frage: 'Was ist die Hauptstadt von Deutschland?',
                antwort: 'Berlin',
                modus: 'normal',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.frage).toBe('Was ist die Hauptstadt von Deutschland?');
    });

    // Test für PUT /questions/update/:id
    test('PUT /questions/update/:id - sollte eine Frage aktualisieren', async () => {
        const question = await mongoose.connection.db.collection('fragens').insertOne({
            frageID: '12346',
            frage: 'Was ist 3 + 3?',
            antwort: '6',
            modus: 'normal',
        });

        const res = await request(server)
            .put(`/questions/update/${question.insertedId}`)
            .send({
                antwort: 'sechs',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.antwort).toBe('sechs');
    });

    // Test für DELETE /questions/:id
    test('DELETE /questions/:id - sollte eine Frage löschen', async () => {
        const question = await mongoose.connection.db.collection('fragens').insertOne({
            frageID: '12347',
            frage: 'Was ist 4 + 4?',
            antwort: '8',
            modus: 'normal',
        });

        const res = await request(server).delete(`/questions/${question.insertedId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Frage erfolgreich gelöscht');
    });
});
