const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/transactions', async (req, res) => {
  const { search_menu, sort_by } = req.query;

  try {
    // Lakukan validasi parameter terlebih dahulu

    // Panggil fungsi untuk mengambil data dari database
    const transactions = await getTransactions(search_menu, sort_by);

    res.status(200).json({ data: transactions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

async function getTransactions(search_menu, sort_by) {
  // Kode untuk mengambil data dari database
  let query = `
    SELECT t.id, t.customer_id, c.name AS customer_name, t.menu, t.price, t.qty, t.payment, t.total, t.created_at
    FROM transactions t
    INNER JOIN customers c ON t.customer_id = c.id
  `;
  let values = [];

  // Lakukan pencarian data berdasarkan menu
  if (search_menu) {
    query += 'WHERE t.menu ILIKE $1 ';
    values.push(`%${search_menu}%`);
  }

  // Urutkan data berdasarkan nama customer
  if (sort_by === 'customer_name') {
    query += 'ORDER BY c.name ';
  }

  query += 'ORDER BY t.created_at DESC';

  const { rows } = await pool.query(query, values);

  return rows;
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
