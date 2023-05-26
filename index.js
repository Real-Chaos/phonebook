const express = require("express");
const app = express();
const cors = require("cors");

app.use("cors");
app.use(exprss.static("build"));
app.use(express.json());

let contacts = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId =
    contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) : 0;
  return maxId + 1;
};

app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

app.get("/info", (req, res) => {
  const date = Date();
  const text = `
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${date}</p>
    
    `;
  res.send(text);
});

app.get("/api/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const findContact = contacts.find((c) => id === c.id);
  findContact
    ? res.json(findContact)
    : res.send("<p>this contact does not exist</p>");
});

app.post("/api/contacts", (req, res) => {
  const body = req.body;
  const checkName = contacts.find((c) => body.name === c.name);
  if (checkName) {
    res.json({ error: "name already exists" }).status(404).end();
  } else if (body.name.trim().length < 1 || body.number.trim().length < 1) {
    res.json({ error: "name or number is missing" }).status(404).end();
  } else {
    const contact = {
      id: generateId(),
      name: body.name,
      number: body.number,
    };

    contacts = contacts.concat(contact);
    res.json(contact);
  }
});

app.delete("/api/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter((c) => c.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
