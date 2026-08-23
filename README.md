# DINCHEN DIGITAL

Professional Digital & Online Solutions.

## Project structure

- `FRONTEND` - static HTML, CSS, and JavaScript site for Netlify
- `BACKEND` - Node.js and Express API for Render

## Run locally

1. Open a terminal in `BACKEND`.
2. Run `npm install`.
3. Run `npm start`.
4. Open `FRONTEND/index.html` in a browser.

The booking form uses `http://localhost:3000` by default. After deploying the backend, set `window.DINCHEN_API_URL` in `FRONTEND/script.js` to the Render service URL.

## Deploy backend to Render

Create a new Web Service from the `BACKEND` folder:

- Build command: `npm install`
- Start command: `npm start`
- Environment: Node
- Add `FRONTEND_URL` with the Netlify URL
- Add `CONTACT_EMAIL=pradhandinchen@gmail.com`
- Add SMTP values from `BACKEND/.env.example` to send enquiries by email

Without SMTP values, enquiries are accepted and printed in the Render logs.

## Deploy frontend to Netlify

Create a new Netlify site from the repository:

- Base directory: `FRONTEND`
- Build command: leave empty
- Publish directory: `.`

## GitHub

From the project root, create a GitHub repository, then run:

```powershell
git init
git add .
git commit -m "Build DINCHEN DIGITAL website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your own GitHub repository URL. Do not commit a real `.env` file or any email password.
