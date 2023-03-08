import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

const createDatabase = `
DROP DATABASE IF EXISTS carcare; 

CREATE DATABASE carcare; USE carcare; 

CREATE TABLE promotion(
	code varchar(255) NOT NULL PRIMARY KEY,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    starttime BIGINT(11) UNSIGNED NULL,
    endtime BIGINT(11) UNSIGNED NULL,
    limitflag BOOLEAN,
    limit_amount int(11),
    limitType varchar(255)
);

CREATE TABLE price_per_typeP(
    code varchar(255) NOT NULL,
    type_of_car varchar(255) NOT NULL,
    reduce_type varchar(255) NOT NULL,
    reduce BIGINT(11) UNSIGNED NOT NULL,
    PRIMARY KEY(code, type_of_car, reduce_type, reduce),
    CONSTRAINT pptp 
    FOREIGN KEY (code)
    REFERENCES promotion(code)
    ON UPDATE CASCADE
    ON DELETE CASCADE  
);

CREATE TABLE promotion_by_day(
	code varchar(255) NOT NULL,
  day varchar(255) NOT NULL,
  PRIMARY KEY (code, day)
);

ALTER TABLE promotion_by_day
ADD CONSTRAINT pbdp
    	FOREIGN KEY (code)
    	REFERENCES promotion(code)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE;
      
CREATE TABLE can_reduce(
  code varchar(255) NOT NULL,
  service_id varchar(255) NOT NULL,
  PRIMARY KEY(code, service_id),
  CONSTRAINT crc
  FOREIGN KEY (code)
  REFERENCES promotion(code)
  ON UPDATE CASCADE
  ON DELETE CASCADE 
);
`;

connection.query(createDatabase, (err, result) => {
  if (err) throw err;
  console.log("Database created");
});

export default connection;
