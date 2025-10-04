# Week 1 Assignment: MongoDB – Data Layer Fundamentals and Advanced Techniques

## 📝 Overview

This assignment demonstrates the fundamentals of MongoDB, including:

- CRUD operations (Create, Read, Update, Delete)  
- Advanced queries with filtering, projection, sorting, and pagination  
- Aggregation pipelines for data analysis  
- Indexing and performance optimization  

The project uses **MongoDB Atlas** as the database and **Node.js** to run scripts.

---

## 🛠️ Setup Instructions

1. **Clone the repository** (from GitHub Classroom):

```bash
git clone <your-repo-url>
cd <your-repo-folder>

2. **Install dependencies**:
```bash
npm install

3. **Insert sample books into the database**:

```bash
node insert_books.js
Populates the books collection in the plp_bookstore database on MongoDB Atlas.

Ensure the connection string in insert_books.js is correct and points to your Atlas cluster.

4. **Run all queries**:
```bash
node queries.js
Executes all tasks (CRUD, advanced queries, aggregation, indexing) and prints results in the terminal.

📂 Files Included

insert_books.js → Script to populate the books collection

queries.js → All MongoDB queries for Tasks 2–5

README.md → This file

mongodb_books_collection.png → Screenshot of the books collection in MongoDB Atlas

package.json → Project dependencies

✅ Submission Checklist

 insert_books.js runs successfully and inserts all sample books

 queries.js runs successfully and performs all CRUD, advanced queries, aggregation, and indexing tasks

 Screenshot of MongoDB Atlas showing the books collection (mongodb_books_collection.png)

 README.md explains setup and how to run scripts

 All files committed and pushed to GitHub Classroom