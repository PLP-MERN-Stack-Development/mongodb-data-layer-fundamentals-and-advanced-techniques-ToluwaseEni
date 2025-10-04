// queries.js - Week 1 MongoDB Assignment (All Tasks)

// Import MongoDB client
const { MongoClient } = require('mongodb');

// MongoDB Atlas connection URI
const uri = 'mongodb+srv://Week1Ass:Week1Ass@cluster0.wkkc7gp.mongodb.net/plp_bookstore?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'plp_bookstore';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const db = client.db(dbName);
    const books = db.collection('books');

    // -------------------------
    // Task 2: Basic CRUD Operations
    // -------------------------

    const fictionBooks = await books.find({ genre: 'Fiction' }).toArray();
    console.log('\nFiction Books:', fictionBooks);

    const recentBooks = await books.find({ published_year: { $gt: 2000 } }).toArray();
    console.log('\nBooks published after 2000:', recentBooks);

    const orwellBooks = await books.find({ author: 'George Orwell' }).toArray();
    console.log('\nGeorge Orwell Books:', orwellBooks);

    await books.updateOne({ title: '1984' }, { $set: { price: 12.99 } });
    console.log('\nUpdated price of 1984');

    await books.deleteOne({ title: 'Moby Dick' });
    console.log('\nDeleted Moby Dick');

    // -------------------------
    // Task 3: Advanced Queries
    // -------------------------

    const inStockRecent = await books.find({ in_stock: true, published_year: { $gt: 2010 } })
                                      .project({ title: 1, author: 1, price: 1, _id: 0 })
                                      .toArray();
    console.log('\nIn-stock books after 2010:', inStockRecent);

    const sortedAsc = await books.find().sort({ price: 1 }).toArray();
    console.log('\nBooks sorted by price ascending:', sortedAsc);

    const page1 = await books.find().skip(0).limit(5).toArray();
    console.log('\nPage 1 books:', page1);

    const page2 = await books.find().skip(5).limit(5).toArray();
    console.log('\nPage 2 books:', page2);

    // -------------------------
    // Task 4: Aggregation Pipelines
    // -------------------------

    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log('\nAverage price by genre:', avgPriceByGenre);

    const topAuthor = await books.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log('\nAuthor with most books:', topAuthor);

    const booksByDecade = await books.aggregate([
      { $project: { title: 1, decade: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } } },
      { $group: { _id: "$decade", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log('\nBooks grouped by decade:', booksByDecade);

    // -------------------------
    // Task 5: Indexing
    // -------------------------

    await books.createIndex({ title: 1 });
    console.log('\nIndex on title created');

    await books.createIndex({ author: 1, published_year: 1 });
    console.log('Compound index on author and published_year created');

    const explainStats = await books.find({ title: '1984' }).explain('executionStats');
    console.log('\nExplain stats for title search:', explainStats.executionStats);

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

// Run the queries
runQueries();
