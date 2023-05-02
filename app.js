const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/transactions', async (req, res) => {
  const { customer_id, menu, price, qty, payment, total } = req.body;

  try {
    // Lakukan validasi data terlebih dahulu sebelum disimpan ke database

    // Simpan data ke database
    const newTransaction = {
      customer_id,
      menu,
      price,
      qty,
      payment,
      total,
      created_at: new Date().toISOString()
    };

    const savedTransaction = await saveTransaction(newTransaction);

    res.status(201).json(savedTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

async function saveTransaction(transaction) {
  // Kode untuk menyimpan data ke database
  const { customer_id, menu, price, qty, payment, total, created_at } = transaction;
  const query = `
    INSERT INTO transactions (customer_id, menu, price, qty, payment, total, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, customer_id, menu, price, qty, payment, total, created_at
  `;
  const values = [customer_id, menu, price, qty, payment, total, created_at];

  const { rows } = await pool.query(query, values);

  return rows[0];
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
