Dalam membangun API ini, beberapa hal yang saya perhatikan adalah:

1. Penggunaan validasi untuk memastikan data yang dimasukkan oleh user sudah sesuai dengan format yang diinginkan dan untuk mencegah terjadinya SQL injection atau serangan lainnya.
2. Penggunaan parameter pencarian dan pengurutan pada API untuk memudahkan pengguna dalam menemukan data yang dibutuhkan.
3. Penggunaan pool connection untuk menghindari koneksi database yang terlalu banyak, sehingga API dapat menangani banyak user yang mengakses secara bersamaan dengan baik, meskipun terdapat ribuan transaksi dalam database.
4. Pembuatan unit test dan integration test untuk memastikan fungsi API berjalan dengan baik.
5. Penggunaan Docker dan docker-compose untuk deployment yang lebih mudah dan cepat.
6. Penggunaan SQL tanpa ORM untuk memperkuat pemahaman tentang dasar SQL.

Namun, terdapat beberapa permasalahan yang mungkin dapat terjadi dalam pembuatan API ini, seperti:

- Overload database akibat terlalu banyaknya transaksi yang disimpan di dalamnya. Untuk mengatasi hal ini, kita dapat menggunakan teknologi database yang scalable seperti Cassandra atau MongoDB, atau menggunakan teknik database sharding untuk mempartisi data ke dalam beberapa database yang berbeda.
- Dibutuhkan teknik caching untuk meningkatkan performa API ketika terjadi banyak user yang mengakses API secara bersamaan. Teknik caching dapat dilakukan dengan menggunakan Redis atau memcached.
- Penggunaan SQL tanpa ORM dapat menyulitkan proses development dan maintenance di kemudian hari, apabila terjadi perubahan struktur tabel. Untuk mengatasi hal ini, kita dapat menggunakan query builder seperti Knex atau raw SQL query dengan menggunakan template string.
- Penggunaan Docker dan docker-compose memudahkan deployment, namun masih membutuhkan pengaturan yang baik untuk memastikan kontainer berjalan dengan baik dan aman.