const request = require('supertest');
const app = require('./app');

describe('POST /transactions', () => {
  it('should create a new transaction', async () => {
    const transaction = {
      customer_id: 1,
      menu: 'Nasi Goreng',
      price: 20000,
      qty: 2,
      payment: 40000,
      total: 42000,
    };

    const res = await request(app)
      .post('/transactions')
      .send(transaction);

    expect(res.statusCode).toEqual(201);
    expect(res.body.customer_id).toEqual(transaction.customer_id);
    expect(res.body.menu).toEqual(transaction.menu);
    expect(res.body.price).toEqual(transaction.price);
    expect(res.body.qty).toEqual(transaction.qty);
    expect(res.body.payment).toEqual(transaction.payment);
    expect(res.body.total).toEqual(transaction.total);
  });
});

describe('GET /transactions', () => {
  it('should return a list of transactions sorted by date', async () => {
    const res = await request(app)
      .get('/transactions')
      .expect(200);

    expect(res.body.data).toHaveLength(2);
    expect(res.body.data[0].menu).toEqual('Nasi Goreng');
    expect(res.body.data[1].menu).toEqual('Mie Goreng');
  });

  it('should return a list of transactions filtered by menu', async () => {
    const res = await request(app)
      .get('/transactions?search_menu=Goreng')
      .expect(200);

    expect(res.body.data).toHaveLength(2);
    expect(res.body.data[0].menu).toEqual('Nasi Goreng');
    expect(res.body.data[1].menu).toEqual('Mie Goreng');
  });

  it('should return a list of transactions sorted by customer name', async () => {
    const res = await request(app)
      .get('/transactions?sort_by=customer_name')
      .expect(200);

    expect(res.body.data).toHaveLength(2);
    expect(res.body.data[0].customer_name).toEqual('John Doe');
    expect(res.body.data[1].customer_name).toEqual('Jane Doe');
  });
});
