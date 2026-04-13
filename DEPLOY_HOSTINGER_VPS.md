# Guida Deploy su Hostinger VPS

## Mauro Ferrante Consulting Studio
### Stack: React (Frontend) + FastAPI (Backend) + MongoDB

---

## PREREQUISITI

1. **VPS Hostinger** con almeno 2GB RAM e Ubuntu 22.04/24.04
2. **Dominio** mauroferranteconsulting.com collegato al VPS (DNS A record puntato all'IP del VPS)
3. **Accesso SSH** al VPS (root o utente sudo)

---

## PASSO 1: Accesso e Aggiornamento del Server

```bash
# Collegati al VPS via SSH
ssh root@TUO_IP_VPS

# Aggiorna il sistema
apt update && apt upgrade -y
```

---

## PASSO 2: Installa le Dipendenze

```bash
# Node.js 18+ (per il build React)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Python 3.11+ e pip
apt install -y python3 python3-pip python3-venv

# Nginx (reverse proxy)
apt install -y nginx

# Certbot (certificato SSL gratuito Let's Encrypt)
apt install -y certbot python3-certbot-nginx

# MongoDB
# Segui la guida ufficiale per Ubuntu:
# https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update && apt install -y mongodb-org
systemctl start mongod
systemctl enable mongod

# Yarn (per il frontend)
npm install -g yarn
```

---

## PASSO 3: Scarica il Codice

### Opzione A: Da GitHub (consigliata)
```bash
cd /var/www
git clone https://github.com/TUO_USERNAME/mauro-ferrante-consulting.git app
cd app
```

### Opzione B: Upload manuale via SCP
```bash
# Dal tuo PC locale:
scp -r /percorso/locale/app root@TUO_IP_VPS:/var/www/app
```

---

## PASSO 4: Configura il Backend

```bash
cd /var/www/app/backend

# Crea ambiente virtuale Python
python3 -m venv venv
source venv/bin/activate

# Installa dipendenze
pip install -r requirements.txt

# Configura le variabili d'ambiente
nano .env
```

**Contenuto del file `.env` backend:**
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=mauro_ferrante_consulting
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=TUA_EMAIL_GMAIL
SMTP_PASS=TUA_APP_PASSWORD_GMAIL
SMTP_TO=mauro@mauroferrante.com
ADMIN_PASS=4bund4nc142026!
CORS_ORIGINS=https://www.mauroferranteconsulting.com,https://mauroferranteconsulting.com
```

**Testa che il backend funzioni:**
```bash
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001
# Ctrl+C per fermare dopo aver verificato
```

---

## PASSO 5: Configura e Fai il Build del Frontend

```bash
cd /var/www/app/frontend

# Configura l'URL del backend
nano .env
```

**Contenuto del file `.env` frontend:**
```
REACT_APP_BACKEND_URL=https://www.mauroferranteconsulting.com
```

```bash
# Installa dipendenze e fai il build
yarn install
yarn build
```

Il build produrra la cartella `/var/www/app/frontend/build/` con i file statici.

---

## PASSO 6: Configura il Servizio Backend (systemd)

```bash
nano /etc/systemd/system/mfc-backend.service
```

**Contenuto:**
```ini
[Unit]
Description=MFC FastAPI Backend
After=network.target mongod.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/app/backend
Environment=PATH=/var/www/app/backend/venv/bin
ExecStart=/var/www/app/backend/venv/bin/uvicorn server:app --host 127.0.0.1 --port 8001
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
# Attiva e avvia il servizio
systemctl daemon-reload
systemctl enable mfc-backend
systemctl start mfc-backend
systemctl status mfc-backend  # Verifica che sia "active (running)"
```

---

## PASSO 7: Configura Nginx (Reverse Proxy + Frontend)

```bash
nano /etc/nginx/sites-available/mauroferranteconsulting.com
```

**Contenuto:**
```nginx
server {
    listen 80;
    server_name mauroferranteconsulting.com www.mauroferranteconsulting.com;

    # Frontend — file statici React
    root /var/www/app/frontend/build;
    index index.html;

    # Tutte le richieste /api/ vanno al backend FastAPI
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # React Router — tutte le route frontend puntano a index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache per file statici
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Sitemap e robots
    location = /sitemap.xml {
        try_files $uri =404;
    }
    location = /robots.txt {
        try_files $uri =404;
    }
}
```

```bash
# Abilita il sito e rimuovi il default
ln -s /etc/nginx/sites-available/mauroferranteconsulting.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Verifica la configurazione e riavvia
nginx -t
systemctl restart nginx
```

---

## PASSO 8: Attiva HTTPS con Let's Encrypt (SSL Gratuito)

```bash
certbot --nginx -d mauroferranteconsulting.com -d www.mauroferranteconsulting.com
```

Certbot:
- Ti chiedera la tua email (per notifiche scadenza)
- Accetta i termini di servizio
- Scegli se redirect HTTP → HTTPS (CONSIGLIATO: si)

Il certificato si rinnova automaticamente. Per verificare:
```bash
certbot renew --dry-run
```

---

## PASSO 9: Configura il Firewall

```bash
ufw allow ssh
ufw allow 'Nginx Full'
ufw enable
ufw status
```

---

## PASSO 10: Verifica Finale

```bash
# Verifica che tutto sia running
systemctl status mfc-backend
systemctl status nginx
systemctl status mongod

# Testa il backend
curl http://localhost:8001/api/

# Testa il sito
curl -I https://www.mauroferranteconsulting.com
```

Apri il browser e vai su **https://www.mauroferranteconsulting.com** — il sito dovrebbe essere online!

---

## MANUTENZIONE

### Aggiornare il sito (dopo modifiche al codice):

```bash
cd /var/www/app

# Scarica le modifiche
git pull origin main

# Backend — se hai cambiato dipendenze Python:
cd backend
source venv/bin/activate
pip install -r requirements.txt
sudo systemctl restart mfc-backend

# Frontend — se hai cambiato il codice React:
cd ../frontend
yarn install
yarn build
# Nginx serve i file statici, quindi basta il build (no restart necessario)
```

### Vedere i log del backend:
```bash
journalctl -u mfc-backend -f --no-pager
```

### Backup del database MongoDB:
```bash
mongodump --db mauro_ferrante_consulting --out /backup/$(date +%Y%m%d)
```

---

## CHECKLIST DNS (su Hostinger Panel)

| Tipo | Nome | Valore | TTL |
|------|------|--------|-----|
| A | @ | IP_DEL_TUO_VPS | 3600 |
| A | www | IP_DEL_TUO_VPS | 3600 |

---

## NOTE IMPORTANTI

- **SMTP Gmail**: Assicurati che la "App Password" sia attiva sul tuo account Google
- **MongoDB**: Di default ascolta solo su localhost (sicuro). Non esporre la porta 27017
- **Backup**: Imposta un cron job settimanale per il backup del database
- **Monitoraggio**: Considera l'uso di `htop` per monitorare risorse o servizi come UptimeRobot per verifiche esterne
