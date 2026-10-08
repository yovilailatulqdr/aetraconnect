import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

// Persistent file-backed database store on server for 100% reliable cross-browser sync
const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

const INITIAL_DEFAULT_ACCOUNTS = [
  {
    id: 'acc-admin',
    idPelanggan: '10999999',
    nama: 'Administrator Aetra Connect',
    email: 'admin@aetra.co.id',
    telp: '081199887766',
    password: 'aetra123',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'acc-nabila',
    idPelanggan: '10739182',
    nama: 'Nabila Kusumaningsih',
    email: 'nabilakusumaningsih@gmail.com',
    telp: '081298765432',
    password: '1234',
    role: 'customer',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'acc-amara',
    idPelanggan: '10928371',
    nama: 'Amara Maharani',
    email: 'amaramaharani@gmail.com',
    telp: '081322334455',
    password: '1234',
    role: 'customer',
    createdAt: new Date().toISOString(),
  },
];

function readServerDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(content);
      if (!data.accounts) data.accounts = [...INITIAL_DEFAULT_ACCOUNTS];
      return data;
    }
  } catch (err) {
    console.warn('Error reading server db:', err);
  }
  return {
    accounts: [...INITIAL_DEFAULT_ACCOUNTS],
    registrations: [],
    trackingRecords: [],
    bills: [],
    surveys: [],
    lastUpdated: new Date().toISOString(),
  };
}

function writeServerDb(data: any) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Error writing server db:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '50mb' }));

  // Health check endpoint for Cloud Run and container probes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Cross-browser persistent API endpoints
  app.get('/api/sync/all', (req, res) => {
    const db = readServerDb();
    res.json({ success: true, data: db });
  });

  app.post('/api/sync/all', (req, res) => {
    const payload = req.body || {};
    const db = readServerDb();

    if (Array.isArray(payload.accounts)) {
      payload.accounts.forEach((acc: any) => {
        const idx = db.accounts.findIndex(
          (a: any) =>
            (a.email && acc.email && a.email.toLowerCase() === acc.email.toLowerCase()) ||
            (a.idPelanggan && acc.idPelanggan && a.idPelanggan === acc.idPelanggan)
        );
        if (idx >= 0) {
          db.accounts[idx] = { ...db.accounts[idx], ...acc };
        } else {
          db.accounts.push(acc);
        }
      });
    }

    if (Array.isArray(payload.registrations)) {
      payload.registrations.forEach((reg: any) => {
        const idx = db.registrations.findIndex((r: any) => r.noForm === reg.noForm || r.id === reg.id);
        if (idx >= 0) {
          db.registrations[idx] = { ...db.registrations[idx], ...reg };
        } else {
          db.registrations.unshift(reg);
        }
      });
    }

    if (Array.isArray(payload.trackingRecords)) {
      payload.trackingRecords.forEach((track: any) => {
        const idx = db.trackingRecords.findIndex((t: any) => t.noForm === track.noForm);
        if (idx >= 0) {
          db.trackingRecords[idx] = { ...db.trackingRecords[idx], ...track };
        } else {
          db.trackingRecords.unshift(track);
        }
      });
    }

    if (Array.isArray(payload.bills)) {
      payload.bills.forEach((bill: any) => {
        const idx = db.bills.findIndex(
          (b: any) =>
            (b.id && bill.id && b.id === bill.id) ||
            (b.idPelanggan === bill.idPelanggan && b.periodeBulan === bill.periodeBulan)
        );
        if (idx >= 0) {
          db.bills[idx] = { ...db.bills[idx], ...bill };
        } else {
          db.bills.unshift(bill);
        }
      });
    }

    if (Array.isArray(payload.surveys)) {
      payload.surveys.forEach((survey: any) => {
        const idx = db.surveys.findIndex((s: any) => s.id === survey.id);
        if (idx >= 0) {
          db.surveys[idx] = survey;
        } else {
          db.surveys.unshift(survey);
        }
      });
    }

    writeServerDb(db);
    res.json({ success: true, data: db });
  });

  // Dedicated single-entity account endpoints
  app.get('/api/accounts', (req, res) => {
    const db = readServerDb();
    res.json({ success: true, accounts: db.accounts });
  });

  app.post('/api/accounts', (req, res) => {
    const acc = req.body;
    if (!acc || !acc.email) {
      return res.status(400).json({ success: false, error: 'Email required' });
    }
    const db = readServerDb();
    const idx = db.accounts.findIndex(
      (a: any) =>
        (a.email && a.email.toLowerCase() === acc.email.toLowerCase()) ||
        (a.idPelanggan && acc.idPelanggan && a.idPelanggan === acc.idPelanggan)
    );
    if (idx >= 0) {
      db.accounts[idx] = { ...db.accounts[idx], ...acc };
    } else {
      db.accounts.push(acc);
    }
    writeServerDb(db);
    res.json({ success: true, account: acc });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.join(process.cwd(), 'dist', 'index.html'))
      ? path.join(process.cwd(), 'dist')
      : path.join(__dirname);

    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
