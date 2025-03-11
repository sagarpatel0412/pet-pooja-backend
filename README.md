````markdown
# Expense Tracker API

This is a Node.js-based Expense Tracker API that allows users to manage their expenses, categories, and view expenditure statistics.

## 📌 Prerequisites

- **Node.js v20** (Ensure you have Node.js installed)
- **MySQL** (Database server must be running)

## 🚀 Getting Started

---

### **1. Clone the Repository**

```sh
git clone <your-repo-url>
cd <your-repo-folder>
```
````

---

### **2. Install Dependencies**

```sh
npm install
```

---

### **3. Setup Environment Variables**

1. Copy `.env.example` to `.env`:
   ```sh
   cp .env.example .env
   ```
2. Open `.env` and add your database credentials:
   ```
    DIALECT=
    DATABASE_HOST=
    DATABASE_NAME=
    DATABASE_USER=
    DATABASE_PASS=
    DATABASE_PORT=
    PORT=8001
    NODE_ENV=development
   ```

---

### **4. Run Migrations**

To create database tables, run:

```sh
npm run migrate
```

---

To rollback the last migration:

```sh
npm run rollback
```

---

### **5. Run the Application**

#### **Development Mode (Uses `nodemon`)**

```sh
npm run dev
```

---

#### **Production Mode**

```sh
npm start
```

(Note: `npm start` does **not** use `nodemon`)

---

## Created By

**Sagar Patel**  
GitHub: [@sagarpatel0412](https://github.com/sagarpatel0412)

---
