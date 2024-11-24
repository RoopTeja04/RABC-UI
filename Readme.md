# Role-Based Access Control (RBAC) Admin Dashboard

A React-based Admin Dashboard to manage users, roles, and permissions with a focus on Role-Based Access Control (RBAC) principles. The application stores data in `localStorage` and provides an intuitive interface for managing users, assigning roles, and updating permissions.


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Install Dependencies](#install-dependencies)
- [Usage](#usage)
- [File Structure](#file-structure)


## Features

1. **User Management**:
   - Add, edit, and delete users.
   - Assign roles and manage user status (Active/Inactive).
   - Display assigned permissions dynamically based on roles.

2. **Role Management**:
   - Default roles: Admin, Viewer, and Editor.
   - Admin: `Read, Write, Delete`
   - Viewer: `Read`
   - Editor: `Read, Write`
   - Add or modify roles dynamically.

3. **Permission Management**:
   - Manage default permissions: `Read`, `Write`, `Delete`.
   - Add or remove permissions dynamically.
   - Permissions automatically update across roles.

4. **Data Persistence**:
   - Uses `localStorage` to persist data across sessions.

5. **Responsive Design**:
   - Optimized for desktop and mobile devices.


## Technologies Used

- **Frontend**: React.js
- **Styling**: CSS
- **Data Storage**: LocalStorage
- **Routing**: React Router DOM


## Setup

### Prerequisites
- Node.js and npm installed on your machine.

### Installation
1. Clone the repository:

   ```bash
   git clone https://github.com/RoopTeja04/RABC-UI.git
   cd myapp
2. Start the development server:

    ```bash
    npm run dev
3. Open your browser and navigate to `http://localhost:3000`.

## Install Dependencies

Before starting the development server, ensure all dependencies are installed:

1. Run the following command in the project directory:

    ```bash
    npm install
2. This will install all required packages listed in package.json, including:
    - `react`
    - `react-dom`
    - `react-router-dom`

3. After successful installation, you can proceed to **start the development server**.

## Usage

1. Navigate Through the Dashboard:

    - Use the navbar to switch between "Users", "Roles", and "Permissions" sections.
2. Manage Users:

    - Add a new user by filling out the form and assigning a role.
    - Edit existing users or delete them as needed.
3. Manage Roles:

    - Add new roles or edit existing ones.
    - Assign default or custom permissions to each role.
4. Manage Permissions:

    - Add or remove permissions dynamically.
    - Changes reflect automatically in roles and users.

## File Structure

`myapp/`<br/>
├── `src/` <br/>
│   ├── `Components/`<br/>
│   │   ├── `HomePage.js`<br/>
│   │   ├── `UsersPage.js`<br/>
│   │   ├── `Roles.js`<br/>
│   │   ├── `Permissions.js`<br/>
│   ├── `App.js`<br/>
│   ├── `Layout.js`<br/>
│   ├── `index.js`<br/>
├── `public/`<br/>
├── `package.json`<br/>
├── `README.md`<br/>

--------------------------------

*Project Done By*

# Roop Teja G

A passionate React.js and web developer with a keen interest in front-end development and software engineering.