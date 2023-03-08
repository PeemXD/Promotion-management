class DMC_Ctrl {
  constructor(conn) {
    this.conn = conn;
  }

  async select(tb, col, val) {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM ${tb}`;
      if (col && val) {
        query += ` WHERE ${col} = '${val}'`;
      }
      console.log(query);
      this.conn.query(query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  async insert(tb, col, val) {
    return new Promise((resolve, reject) => {
      let query = `INSERT INTO ${tb} (${col.join(", ")}) VALUES (${val
        .map((v) => `'${v}'`)
        .join(", ")})`;
      console.log(query);
      this.conn.query(query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  async update(tb, set, where) {
    return new Promise((resolve, reject) => {
      let query = `UPDATE ${tb} SET ${set
        .map((s) => `${s[0]} = '${s[1]}'`)
        .join(", ")} WHERE ${where[0]} = '${where[1]}'`;
      console.log(query);
      this.conn.query(query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  async delete(tb, where) {
    return new Promise((resolve, reject) => {
      let query = `DELETE FROM ${tb} WHERE ${where[0]} = '${where[1]}'`;
      console.log(query);
      this.conn.query(query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

export default DMC_Ctrl;
