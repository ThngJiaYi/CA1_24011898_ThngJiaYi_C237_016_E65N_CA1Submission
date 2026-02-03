const express = require('express');
const { title } = require('process');
const app = express();
const port = 3000;

//Middleware for JSON parsing
app.use(express.json());

// Middleware to parse form data from POST requests
app.use(express.urlencoded({ extended: true })); 
let Info = [
  {id: 1 ,username:'Jiayi', email: '24011898@myrp.edu.sg', password: '123'},
]

let bugs = [
  { id: 1, name: "Login page not loading", status: "Open" },
  { id: 2, name: "Database connection error", status: "Assigned" },
  { id: 3, name: "CSS alignment issue", status: "New" }
];

const statusOptions = ["New", "Assigned", "Open", "Fixed", "Verified", "Closed", "Reopened", "Duplicate"];

// GET: Login form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>System Access | Login</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body { background-color: #000; color: #0f0; font-family: 'Courier New', monospace; }
        .terminal-container {
          background-color: #111; border: 1px solid #0f0; border-radius: 5px;
          box-shadow: 0 0 15px #0f0; margin-top: 5rem; padding: 2rem;
        }
        .form-control { background-color: #222; color: #0f0; border: 1px solid #0f0; }
        .btn-primary { background-color: #0f0; color: #000; font-weight: bold; border: none; }
        .btn-primary:hover { background-color: #0a0; }
        .blink { animation: blink 1s step-end infinite; }
        @keyframes blink { from, to { opacity: 1; } 50% { opacity: 0; } }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-4 terminal-container">
            <h1 class="text-center mb-4">SYSTEM ACCESS</h1>
            <form action="/" method="POST">
              <div class="mb-3">
                <label for="email" class="form-label">EMAIL:</label>
                <input name="email" type="email" class="form-control" id="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">PASSWORD:</label>
                <input name="password" type="password" class="form-control" id="password" required>
              </div>
              <div class="d-grid gap-2 mb-3">
                <button type="submit" class="btn btn-primary">LOGIN</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

// POST: Login handler
app.post('/', (req, res) => {
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;

  const user = Info.find(u => u.email === inputEmail && u.password === inputPassword);

  if (user) {
    res.redirect('/Homepage');
  } else {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UNAUTHORIZED ACCESS | SYSTEM</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            background-color: #000;
            color: #f00; /* Red text for warning */
            font-family: 'Courier New', monospace;
        }
        .terminal-container {
            background-color: #111;
            border: 1px solid #f00;
            border-radius: 5px;
            box-shadow: 0 0 15px #f00;
            margin-top: 5rem;
            padding: 2rem;
            text-align: center;
        }
        .blink {
            animation: blink 0.5s step-end infinite;
        }
        @keyframes blink {
            from, to { opacity: 1; }
            50% { opacity: 0; }
        }
        .status-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
            background-color: #f00;
            box-shadow: 0 0 5px #f00;
        }
        .btn-return {
            background-color: #300;
            color: #f00;
            border: 1px solid #f00;
            margin-top: 2rem;
        }
        .btn-return:hover {
            background-color: #500;
            color: #f00;
        }
        .access-denied {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        .binary-code {
            color: #300;
            font-size: 0.8rem;
            margin-top: 2rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 terminal-container">
                <div class="access-denied">
                    <i class="fas fa-lock"></i> ACCESS DENIED
                </div>
                <p><span class="status-indicator"></span> UNAUTHORIZED ACCESS ATTEMPT DETECTED</p>
                <p>Invalid credentials provided. System access revoked.</p>
                
                <div class="binary-code">
                    01010100 01110010 01111001 00100000 01100001 01100111 01100001 01101001 01101110 00100000 01101111 01110010 00100000 01100011 01101111 01101110 01110100 01100001 01100011 01110100 00100000 01100001 01100100 01101101 01101001 01101110
                </div>
                
                <a href="/" class="btn btn-return">
                    <i class="fas fa-arrow-left"></i> RETURN TO LOGIN
                </a>
                
                <div class="mt-4">
                    <span class="blink">WARNING: MULTIPLE FAILED ATTEMPTS WILL LOCK YOUR ACCOUNT</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`);
  }
});

// Helper function to gen
// erate HTML
function generateHTML(title, body) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | BUG TRACKER</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { background-color: #000; color: #0f0; font-family: 'Courier New', monospace; }
        .navbar { background-color: #111; border-bottom: 1px solid #0f0; }
        .navbar-brand { color: #0f0; font-weight: bold; }
        .nav-link { color: #0f0; }
        .nav-link:hover { color: #0f0; text-decoration: underline; }
        .dropdown-menu { background-color: #111; border: 1px solid #0f0; }
        .dropdown-item { color: #0f0; }
        .dropdown-item:hover { background-color: #0f0; color: #000; }
        .terminal-container { background-color: #111; border: 1px solid #0f0; border-radius: 5px; box-shadow: 0 0 15px #0f0; margin-top: 1rem; padding: 2rem; }
        .form-control { background-color: #222; color: #0f0; border: 1px solid #0f0; }
        .form-control:focus { background-color: #222; color: #0f0; border-color: #0f0; box-shadow: 0 0 10px #0f0; }
        .btn-primary { background-color: #0f0; color: #000; border: none; font-weight: bold; }
        .btn-primary:hover { background-color: #0a0; }
        .btn-secondary { background-color: #333; color: #0f0; border: 1px solid #0f0; }
        .btn-secondary:hover { background-color: #444; color: #0f0; }
        .blink { animation: blink 1s step-end infinite; }
        @keyframes blink { from, to { opacity: 1; } 50% { opacity: 0; } }
        .bug-item { border-left: 3px solid #0f0; padding-left: 10px; margin-bottom: 15px; }
        .status-new { color: #0ff; }
        .status-assigned { color: #ff0; }
        .status-open { color: #f90; }
        .status-fixed { color: #0f0; }
        .status-verified { color: #0f0; text-decoration: underline; }
        .status-closed { color: #999; }
        .status-reopened { color: #f00; }
        .status-duplicate { color: #909; }
        .btn-danger {
        background-color: #300;
        color: #f00;
        border: 1px solid #f00;
      }
      .btn-danger:hover {
        background-color: #500;
        color: #f00;
      }
    </style>
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="/Homepage">
                <i class="fas fa-bug me-2"></i>BUG TRACKER
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon" style="color:#0f0;">
                    <i class="fas fa-bars"></i>
                </span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/add-bug">
                            <i class="fas fa-plus-circle me-1"></i>ADD BUG
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="fas fa-user me-1"></i>USER_ACCESS
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="/profile"><i class="fas fa-user-circle me-2"></i>PROFILE</a></li>
                            <li><hr class="dropdown-divider" style="border-color: #0f0;"></li>
                            <li><a class="dropdown-item" href="/"><i class="fas fa-sign-out-alt me-2"></i>SIGN OUT</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
        ${body}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
  `;
}

// Helper function to get status class
function getStatusClass(status) {
  const statusClassMap = {
    "New": "status-new",
    "Assigned": "status-assigned",
    "Open": "status-open",
    "Fixed": "status-fixed",
    "Verified": "status-verified",
    "Closed": "status-closed",
    "Reopened": "status-reopened",
    "Duplicate": "status-duplicate"
  };
  return statusClassMap[status] || "";
}

// Routes
app.get('/Homepage', (req, res) => {
  const body = `
    <div class="terminal-container">
      <h2 class="mb-4">CURRENT BUGS </h2>
      <div class="d-flex justify-content-between mb-4">
        <span class="align-self-center">TOTAL BUGS: ${bugs.length}</span>
      </div>
      <div class="bug-list">
        ${bugs.map(bug => `
          <div class="bug-item mb-3">
            <h4>#${bug.id} - ${bug.name}</h4>
            <p class="${getStatusClass(bug.status)}">STATUS: ${bug.status}</p>
            <div class="d-flex justify-content-end">
              <a href="/update-bug?id=${bug.id}" class="btn btn-secondary btn-sm">UPDATE STATUS</a>
            </div>
            <div class="d-flex justify-content-end">
              <a href="/update-description?id=${bug.id}" id = "description" class="btn btn-secondary btn-sm">DESCRIPTION</a>
            </div>
            <div class="progress mb-3" style="height: 30px;">
          <div class="progress-bar" role="progressbar" style="width: ${bug.progress}%;"
               aria-valuenow="${bug.progress}" aria-valuemin="0" aria-valuemax="100">
            ${bug.progress}%
          </div>
        </div>
            
            <form action="/delete-bug" method="POST" class="d-inline">
                <input type="hidden" name="id" value="${bug.id}">
                <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this bug?')">
                  <i class="fas fa-trash-alt"></i> DELETE
                </button>
              </form>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  res.send(generateHTML('Bug Tracker', body));
});

app.get('/add-bug', (req, res) => {
  const body = `
<div class="terminal-container">
  <h2 class="mb-4">CURRENT BUGS </h2>
  <div class="d-flex justify-content-between mb-4">
    <span class="align-self-center">TOTAL BUGS: ${bugs.length}</span>
  </div>
  <div class="bug-list">
    ${bugs.map(bug => `
      <div class="bug-item mb-3">
        <h4>#${bug.id} - ${bug.name}</h4>
        <p class="${getStatusClass(bug.status)}">STATUS: ${bug.status}</p>
        <div class="d-flex justify-content-between">
          <div>
            <a href="/update-bug?id=${bug.id}" class="btn btn-secondary btn-sm me-2">UPDATE STATUS</a>
            <a href="/editDescription?id=${bug.id}" class="btn btn-info btn-sm">DESCRIPTION</a>
          </div>
          <form action="/delete-bug" method="POST" class="d-inline">
            <input type="hidden" name="id" value="${bug.id}">
            <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this bug?')">
              <i class="fas fa-trash-alt"></i> DELETE
            </button>
          </form>
        </div>
        <div class="progress mb-3" style="height: 30px;">
          <div class="progress-bar" role="progressbar" style="width: ${bug.progress}%;"
              aria-valuenow="${bug.progress}" aria-valuemin="0" aria-valuemax="100">
            ${bug.progress}%
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
  `;
  res.send(generateHTML('Add Bug', body));
});

app.post('/delete-bug', (req, res) => {
  const { id } = req.body;
  const bugIndex = bugs.findIndex(b => b.id === parseInt(id));
  
  if (bugIndex !== -1) {
    bugs.splice(bugIndex, 1);
  }
  
  res.redirect('/Homepage');
});

app.post('/add-bug', (req, res) => {
  const { name, status } = req.body;
  const newId = bugs.length > 0 ? Math.max(...bugs.map(bug => bug.id)) + 1 : 1;
  
  bugs.push({
    id: newId,
    name,
    status
  });
  
  res.redirect('/Homepage');
});

app.get('/update-bug', (req, res) => {
  const bugId = parseInt(req.query.id);
  const bug = bugs.find(b => b.id === bugId);
  
  if (!bug) {
    return res.redirect('/Homepage');
  }
  
  const body = `
    <div class="terminal-container">
      <h2 class="mb-4">UPDATE BUG #${bug.id}</h2>
      <h4 class="mb-3">${bug.name}</h4>
      <form action="/update-bug" method="POST">
        <input type="hidden" name="id" value="${bug.id}">
        <div class="mb-3">
          <label for="status" class="form-label">UPDATE STATUS:</label>
          <select class="form-control" id="status" name="status" required>
            ${statusOptions.map(option => 
              `<option value="${option}" ${bug.status === option ? 'selected' : ''}>${option}</option>`
            ).join('')}
          </select>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary">UPDATE BUG</button>
        </div>
      </form>
    </div>
  `;


  res.send(generateHTML('Update Bug', body));
});

app.post('/update-bug', (req, res) => {
  const { id, status } = req.body;
  const bugIndex = bugs.findIndex(b => b.id === parseInt(id));
  
  if (bugIndex !== -1) {
    bugs[bugIndex].status = status;
  }
  
  res.redirect('/Homepage');
});

app.get("/profile", (req, res) => {
  const user = Info[0]; // Simulate logged-in user
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>USER PROFILE | SYSTEM</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
  <style>
    body {
      background-color: #000;
      color: #0f0;
      font-family: 'Courier New', monospace;
    }
    .navbar, .dropdown-menu {
      background-color: #111;
      border-color: #0f0;
    }
    .nav-link, .navbar-brand, .dropdown-item {
      color: #0f0;
    }
    .terminal-container {
      border: 1px solid #0f0;
      padding: 2rem;
      margin-top: 2rem;
    }
    .profile-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px solid #0f0;
    }
    .edit-btn {
      background: transparent;
      color: #0f0;
      border: 1px solid #0f0;
      padding: 5px 10px;
      border-radius: 3px;
      text-decoration: none;
    }
    .edit-btn:hover {
      background-color: #0f0;
      color: #000;
    }
    .description{
    background:transparent;
    color: #00F;
    border: 1px solid #00F;
    padding: 5px 10px;
    border-radius: 3px;
    text-decoration: none;
    }

    .description:hover{
    background-color:#00F;
    color:#000;
    }
  </style>
</head>
<body>
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="/Homepage"><i class="fas fa-terminal me-2"></i>SYSTEM_CONSOLE</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"><i class="fas fa-bars" style="color: #0f0;"></i></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
            <i class="fas fa-user me-1"></i>USER_ACCESS
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="/profile"><i class="fas fa-user-circle me-2"></i>PROFILE</a></li>
            <li><hr class="dropdown-divider" style="border-color: #0f0;"></li>
            <li><a class="dropdown-item" href="/"><i class="fas fa-sign-out-alt me-2"></i>SIGN OUT</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div class="container">
  <div class="terminal-container">
    <div class="row">
      <div class="col-md-8">
        <h3>PERSONAL DATA </h3>
        <p><strong>USERNAME:</strong> ${user.username}</p>
        <p><strong>EMAIL:</strong> ${user.email}</p>
        <p><strong>SIGNED UP SINCE:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>LAST LOGIN:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>PASSWORD:</strong> ${user.password}</p>
        <p><strong>2FA:</strong> DISABLED</p>
        <p><strong>LAST PASSWORD CHANGE:</strong> ${new Date().toLocaleString()}</p>
        <a class="edit-btn" href="/editPassword/${user.id}">CHANGE PASSWORD</a>
      </div>
    </div>
  </div>
</div>
</body>
</html>
  `);
});

// Route: Reset Password Page (GET)
app.get('/editPassword/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = Info.find(u => u.id === id);

  if (!user) {
    return res.send('<p>User not found.</p><a href="/profile">Back</a>');
  }

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>PASSWORD RESET | SYSTEM</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <style>
    body {
      background-color: #000;
      color: #0f0;
      font-family: 'Courier New', monospace;
    }
    .terminal-container {
      border: 1px solid #0f0;
      margin-top: 5rem;
      padding: 2rem;
    }
    .form-control {
      background-color: #111;
      color: #0f0;
      border: 1px solid #0f0;
    }
    .btn-primary {
      background-color: #0f0;
      color: #000;
      border: none;
    }
    .btn-primary:hover {
      background-color: #0c0;
    }
    .blink {
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      from, to { opacity: 1; }
      50% { opacity: 0; }
    }
  </style>
</head>
<body>
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-6 terminal-container">
      <h1 class="text-center mb-4">PASSWORD RESET </h1>
      <form action="/editPassword/${user.id}" method="POST">
        <div class="mb-3">
          <label for="newPassword" class="form-label">NEW PASSWORD:</label>
          <input type="password" name="newPassword" id="newPassword" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">CONFIRM PASSWORD:</label>
          <input type="password" name="confirmPassword" id="confirmPassword" class="form-control" required>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary">RESET PASSWORD</button>
        </div>
      </form>
    </div>
  </div>
</div>
</body>
</html>
  `);
});

// POST Route: Update password
app.post('/editPassword/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { newPassword, confirmPassword } = req.body;
  const user = Info.find(u => u.id === id);

  if (!user) return res.send('<p>User not found.</p><a href="/profile">Back</a>');
  if (newPassword !== confirmPassword) {
    return res.send(`<p><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>PASSWORD RESET | SYSTEM</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <style>
    body {
      background-color: #000;
      color: #0f0;
      font-family: 'Courier New', monospace;
    }
    .terminal-container {
      border: 1px solid #0f0;
      margin-top: 5rem;
      padding: 2rem;
    }
    .form-control {
      background-color: #111;
      color: #0f0;
      border: 1px solid #0f0;
    }
    .btn-primary {
      background-color: #0f0;
      color: #000;
      border: none;
    }
    .btn-primary:hover {
      background-color: #0c0;
    }
    .blink {
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      from, to { opacity: 1; }
      50% { opacity: 0; }
    }
  </style>
</head>
<body>
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-6 terminal-container">
      <h1 class="text-center mb-4">PASSWORD RESET</h1>
      <form action="/editPassword/${user.id}" method="POST">
        <div class="mb-3">
          <label for="newPassword" class="form-label">NEW PASSWORD:</label>
          <input type="password" name="newPassword" id="newPassword" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">CONFIRM PASSWORD:</label>
          <input type="password" name="confirmPassword" id="confirmPassword" class="form-control" required>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary">RESET PASSWORD</button>
        </div>
      </form>
    </div>
  </div>
</div>
</body>
</html>`);
  }

  user.password = newPassword;
  res.redirect('/profile');
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



