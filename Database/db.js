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
    descriptions varchar(255) NOT NULL,
    starttime BIGINT(11) UNSIGNED NULL,
    endtime BIGINT(11) UNSIGNED NULL,
    limitflag BOOLEAN,
    limit_amount int(11),
    limit_type varchar(255)
);

CREATE TABLE service(
	service_id varchar(255) NOT NULL PRIMARY KEY,
  name varchar(255) NOT NULL,
  description varchar(255) NOT NULL
  
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

ALTER TABLE can_reduce
ADD CONSTRAINT crs
        FOREIGN KEY (service_id)
        REFERENCES service(service_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE;

INSERT INTO service(service_id, name, description)
VALUE("88888888-0000-0000-0000-121212121210", "K Clean", "เซ็ตล้างรถ ดูดฝุ่น อบโอโซนและแว๊กภายใน"),
      ("88888888-0000-0000-0000-121212121211", "K Clean Wax3M", "เซ็ตล้างรถ ดูดฝุ่น อบโอโซน แว๊กภายในและแว๊กเคลือบสีรถภายนอก3M"),
      ("88888888-0000-0000-0000-121212121212", "K Clean Engine", "เซ็ตล้างรถ ดูดฝุ่น อบโอโซน ล้างและพ่นเงาห้องเครื่อง แว๊กภายในและแว๊กเคลือบสีรถภายนอก3M"),
      ("88888888-0000-0000-0000-121212121213", "K Clean Asphalt", "เซ็ตล้างรถ ดูดฝุ่น อบโอโซน ล้างและพ่นเงาห้องเครื่อง ขัดยางมะตอย แว๊กภายในและแว๊กเคลือบสีรถภายนอก3M"),
      ("88888888-0000-0000-0000-121212121214", "K Clean Headlight", "เซ็ตล้างรถ ดูดฝุ่น อบโอโซนและแว๊กภายใน ขัดและเคลือบไฟหน้า");
`;

connection.query(createDatabase, (err, result) => {
  if (err) throw err;
  console.log("Database created");
});

export default connection;
