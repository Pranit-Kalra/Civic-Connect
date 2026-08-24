# CivicConnect 🏙️

CivicConnect is a web-based civic issue management platform that connects citizens, issue resolvers, and administrators in one centralized system.

The platform allows citizens to report local issues, track their reported complaints, and view their status. Resolvers can view and manage assigned issues, while administrators can manage users, resolvers, departments, and reported issues.

## 🚀 Features

* 👤 **Citizen Portal**

  * Report civic issues
  * View submitted issues
  * Track issue status
  * View issue details

* 🛠️ **Resolver Portal**

  * View assigned issues
  * Update issue status
  * Add resolution notes
  * Manage assigned complaints

* 👨‍💼 **Admin Portal**

  * Dashboard with issue information
  * Manage reported issues
  * Assign resolvers to issues
  * Manage users and resolvers
  * Manage departments

* 🔐 **User Authentication**

  * Login and registration
  * Role-based dashboards
  * Persistent login using browser storage

* 💾 **Data Persistence**

  * Uses browser `localStorage` to preserve users, issues, resolvers, and login sessions.

## 🛠️ Tech Stack

* React.js
* JavaScript
* HTML5
* CSS3
* React Router
* LocalStorage

## 📂 Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   └── Sidebar.jsx
│
├── data/
│   └── mockData.js
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   │
│   ├── citizen/
│   ├── resolver/
│   └── admin/
│
└── App.jsx
```

## 🔄 How It Works

```text
Citizen
   ↓
Reports Issue
   ↓
Admin
   ↓
Assigns Resolver
   ↓
Resolver
   ↓
Updates Issue Status
   ↓
Citizen Tracks Progress
```

## 🎯 Purpose

CivicConnect aims to make civic issue reporting and resolution more organized, transparent, and accessible by providing different interfaces for citizens, resolvers, and administrators.

## 👨‍💻 Project

CivicConnect is a frontend-focused React project developed to demonstrate component-based development, routing, state management, role-based interfaces, and data persistence using localStorage.
