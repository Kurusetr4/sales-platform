/* ============================================
   MUSE Pages — Login
   ============================================ */

// Login state
const LoginState = {
  step: 1, // 1 = select role, 2 = select user, 3 = password
  selectedRole: null,
  selectedUser: null,
  expandedGroup: null,
  password: '',
  error: ''
};

function renderLogin() {
  const html = `
    <div class="login-page">
      <div class="login-box">
        <div class="login-logo">
          <div class="login-logo-icon">M</div>
          <h1>MUSE</h1>
          <p>Mandiri Unified Sales Ecosystem</p>
        </div>
        
        ${renderLoginStepIndicator()}
        
        <div id="login-content">
          ${renderLoginStep()}
        </div>
      </div>
    </div>
  `;
  
  UI.render(html);
}

function renderLoginStepIndicator() {
  const steps = [
    { num: 1, label: 'Role' },
    { num: 2, label: 'User' },
    { num: 3, label: 'Password' }
  ];
  
  return `
    <div class="login-step-indicator">
      ${steps.map((s, i) => `
        <div class="login-step ${LoginState.step >= s.num ? 'active' : ''} ${LoginState.step > s.num ? 'completed' : ''}">
          <span class="login-step-number">${LoginState.step > s.num ? '✓' : s.num}</span>
          <span class="login-step-text">${s.label}</span>
        </div>
        ${i < steps.length - 1 ? `<div class="login-step-divider ${LoginState.step > s.num ? 'active' : ''}"></div>` : ''}
      `).join('')}
    </div>
  `;
}

function renderLoginStep() {
  switch (LoginState.step) {
    case 1:
      return renderRoleSelection();
    case 2:
      return renderUserSelection();
    case 3:
      return renderPasswordForm();
    default:
      return '';
  }
}

function renderRoleSelection() {
  const roleGroups = MUSE_CONFIG.getRoleGroups();
  
  return `
    <div class="role-groups">
      ${Object.entries(roleGroups).map(([groupName, roles]) => `
        <div class="role-group ${LoginState.expandedGroup === groupName ? 'expanded' : ''}" id="group-${groupName}">
          <div class="role-group-header" onclick="toggleRoleGroup('${groupName}')">
            <div class="role-group-title">
              <div class="role-group-icon">${roles[0].icon}</div>
              <div>
                <div class="role-group-name">${groupName}</div>
                <div class="role-group-count">${roles.reduce((sum, r) => sum + r.users.length, 0)} users</div>
              </div>
            </div>
            <span class="role-group-chevron">▼</span>
          </div>
          <div class="role-group-content">
            ${roles.map(role => `
              <div class="role-item" onclick="selectRole('${role.role}')">
                <div class="role-item-info">
                  <div class="role-item-name">${role.label}</div>
                  <div class="role-item-dept text-xs text-muted">${role.description}</div>
                </div>
                <span class="badge badge-gray">${role.users.length}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderUserSelection() {
  const users = MUSE_CONFIG.getUsersByRole(LoginState.selectedRole);
  const roleInfo = MUSE_CONFIG.ROLE_INFO[LoginState.selectedRole];
  
  return `
    <div class="login-back-btn" onclick="loginGoBack()">
      ← Back to Role Selection
    </div>
    
    <div class="mb-4">
      <p class="text-sm text-muted mb-2">Select ${roleInfo.label}:</p>
    </div>
    
    <div class="role-groups" style="max-height: 350px; overflow-y: auto;">
      ${users.map(user => `
        <div class="role-item ${LoginState.selectedUser?.id === user.id ? 'selected' : ''}" 
             onclick="selectUser('${user.id}')">
          <div class="role-item-avatar">${MUSE_CONFIG.getInitials(user.name)}</div>
          <div class="role-item-info">
            <div class="role-item-name">${user.name}</div>
            <div class="role-item-dept">${user.department}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderPasswordForm() {
  const user = LoginState.selectedUser;
  const roleInfo = MUSE_CONFIG.ROLE_INFO[user.role];
  
  return `
    <div class="login-back-btn" onclick="loginGoBack()">
      ← Back to User Selection
    </div>
    
    <div class="selected-user-card">
      <div class="selected-user-avatar">${MUSE_CONFIG.getInitials(user.name)}</div>
      <div class="selected-user-info">
        <h3>${user.name}</h3>
        <p>${roleInfo.label} • ${user.department}</p>
      </div>
    </div>
    
    <form onsubmit="handleLogin(event)">
      <div class="form-group">
        <label class="form-label">Password</label>
        <input type="password" 
               class="form-input ${LoginState.error ? 'error' : ''}" 
               placeholder="Enter password" 
               id="login-password"
               autofocus />
        ${LoginState.error ? `<p class="form-error">${LoginState.error}</p>` : ''}
        <p class="form-hint">Demo: gunakan "demo" atau "123456"</p>
      </div>
      
      <button type="submit" class="btn btn-primary btn-lg w-full">
        Login
      </button>
    </form>
  `;
}

// Event Handlers
function toggleRoleGroup(groupName) {
  LoginState.expandedGroup = LoginState.expandedGroup === groupName ? null : groupName;
  updateLoginContent();
}

function selectRole(role) {
  LoginState.selectedRole = role;
  LoginState.step = 2;
  updateLoginUI();
}

function selectUser(userId) {
  LoginState.selectedUser = MUSE_CONFIG.getUserById(userId);
  LoginState.step = 3;
  LoginState.error = '';
  updateLoginUI();
}

function loginGoBack() {
  if (LoginState.step === 3) {
    LoginState.step = 2;
    LoginState.selectedUser = null;
    LoginState.error = '';
  } else if (LoginState.step === 2) {
    LoginState.step = 1;
    LoginState.selectedRole = null;
  }
  updateLoginUI();
}

function handleLogin(e) {
  e.preventDefault();
  const password = document.getElementById('login-password').value;
  
  const result = Auth.login(LoginState.selectedUser.id, password);
  
  if (result.success) {
    // Reset login state
    LoginState.step = 1;
    LoginState.selectedRole = null;
    LoginState.selectedUser = null;
    LoginState.error = '';
    
    Router.navigate('dashboard');
  } else {
    LoginState.error = result.error;
    updateLoginContent();
  }
}

function updateLoginUI() {
  // Re-render entire login page to update step indicator
  renderLogin();
}

function updateLoginContent() {
  // Only update content area
  document.getElementById('login-content').innerHTML = renderLoginStep();
}

// Register route
Router.register('login', renderLogin);
