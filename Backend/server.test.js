const request = require('supertest');
const app = require('./server'); // Importiere die Express-App
const http = require('http');

let server;

beforeAll(() => {
    server = http.createServer(app); // Server erstellen
    server.listen(); // Server starten
});

afterAll(() => {
    server.close(); // Server stoppen
});

describe('API Endpoints Tests', () => {
    test('POST /questions - sollte eine neue Frage hinzufügen', async () => {
        const newQuestion = {
            fragesammlung: "Liam Koch",
            quiz: "Liam",
            frage: "Wie alt ist Liam?",
            antwort: "18",
            modus: "multiple choice",
            auswahl: ["4", "16", "15"]
        };

        const res = await request(server)
            .post('/questions')
            .send(newQuestion);

        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(newQuestion);
    });

    test('POST /questions - sollte eine Frage ohne Auswahl hinzufügen', async () => {
        const newQuestion = {
            fragesammlung: "Liam Koch",
            quiz: "Liam",
            frage: "Wie heisst du",
            antwort: "Liam Koch",
            modus: "normal",
            auswahl: ""
        };

        const res = await request(server)
            .post('/questions')
            .send(newQuestion);

        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(newQuestion);
    });

    test('POST /questions - sollte eine Frage mit true or false Modus hinzufügen', async () => {
        const newQuestion = {
            fragesammlung: "",
            quiz: "Test9",
            frage: "Bin ich liam",
            antwort: "richtig",
            modus: "true or false",
            auswahl: ""
        };

        const res = await request(server)
            .post('/questions')
            .send(newQuestion);

        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(newQuestion);
    });

    test('POST /collections - sollte eine neue Sammlung hinzufügen', async () => {
        const newCollection = {
            name: "test10",
            type: "Quiz",
        };

        const res = await request(server)
            .post('/collections')
            .send(newCollection);

        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(newCollection);
    });

    test('POST /collections - sollte eine Sammlung vom Typ Fragesammlung hinzufügen', async () => {
        const newCollection = {
            name: "Koch2",
            type: "Fragesammlung",
        };

        const res = await request(server)
            .post('/collections')
            .send(newCollection);

        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(newCollection);
    });

    test('GET /questions - sollte alle Fragen abrufen', async () => {
        const res = await request(server).get('/questions');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ frage: "Wie alt ist Liam?" }),
                expect.objectContaining({ frage: "Wie heisst du" }),
                expect.objectContaining({ frage: "Bin ich liam" })
            ])
        );
    });

    test('GET /collections - sollte alle Sammlungen abrufen', async () => {
        const res = await request(server).get('/collections');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "test10" }),
                expect.objectContaining({ name: "Koch2" })
            ])
        );
    });

    test('GET /questions/:id - sollte eine Frage nach ID abrufen', async () => {
        const questionId = "6767f6d4f89b5c5d5e1b7803";
        const res = await request(server).get(`/questions/${questionId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("_id", questionId);
    });

    test('PUT /questions/update/:id - sollte eine Frage basierend auf ID aktualisieren', async () => {
        const questionId = "6767f6d4f89b5c5d5e1b7803";
        const updates = { frage: "Wie alt ist Liam jetzt?", antwort: "19" };

        const res = await request(server)
            .put(`/questions/update/${questionId}`)
            .send(updates);

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(updates);
    });

    test('PUT /questions/update-by-collection-or-quiz - sollte Fragen basierend auf Fragesammlung oder Quiz aktualisieren', async () => {
        const updates = { antwort: "20" };
        const res = await request(server)
            .put('/questions/update-by-collection-or-quiz')
            .send({ fragesammlung: "Liam Koch", quiz: "Liam", updates });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('modifiedCount');
    });

    test('PUT /collections/update/:id - sollte eine Sammlung basierend auf ID aktualisieren', async () => {
        const collectionId = "6749d8683e24a106921229c3";
        const updates = { name: "Koch Updated", type: "Fragesammlung" };

        const res = await request(server)
            .put(`/collections/update/${collectionId}`)
            .send(updates);

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(updates);
    });

    test('PUT /questions/update-by-collection-or-quiz/:fragesammlung - sollte Fragen basierend auf Fragesammlung aktualisieren', async () => {
        const fragesammlung = "Liam Koch";
        const updates = { antwort: "22" };

        const res = await request(server)
            .put(`/questions/update-by-collection-or-quiz/${fragesammlung}`)
            .send(updates);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('details');
    });

    test('DELETE /questions/:id - sollte eine Frage löschen', async () => {
        const questionId = "6767f6d4f89b5c5d5e1b7803";

        const res = await request(server).delete(`/questions/${questionId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Frage erfolgreich gelöscht");
    });

    test('GET /questions/by-quiz/:quizName - sollte Fragen nach Quiz abrufen', async () => {
        const quizName = "Liam";

        const res = await request(server).get(`/questions/by-quiz/${quizName}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ quiz: quizName })
            ])
        );
    });
});
