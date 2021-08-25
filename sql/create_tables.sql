/************************
 * ANCHOR CREATE TABLES *
 ************************/

 CREATE TABLE users (
	id serial NOT NULL UNIQUE,
	name varchar(50) NOT NULL,
	email varchar(50) NOT NULL UNIQUE,
	password varchar(60) NOT NULL,
	create_date TIMESTAMP NOT NULL DEFAULT NOW(),
	create_user_id integer NOT NULL DEFAULT 1,
	update_date TIMESTAMP,
	update_user_id integer,
	deleted BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT users_pk PRIMARY KEY (id)
);

CREATE TABLE product_groups (
	id serial NOT NULL UNIQUE,
	name varchar(10) NOT NULL UNIQUE,
	create_date TIMESTAMP NOT NULL DEFAULT NOW(),
	create_user_id integer NOT NULL,
	update_date TIMESTAMP,
	update_user_id integer,
	deleted BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT product_groups_pk PRIMARY KEY (id)
);

CREATE TABLE products (
	id serial NOT NULL UNIQUE,
	product_group_id integer NOT NULL,
	name varchar(50) NOT NULL,
	description varchar(500),
	measure_unit varchar(10) NOT NULL DEFAULT 'uni',
	create_date TIMESTAMP NOT NULL DEFAULT NOW(),
	create_user_id integer NOT NULL,
	update_date TIMESTAMP,
	update_user_id integer,
	deleted BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT products_pk PRIMARY KEY (id)
);

CREATE TABLE suppliers (
	id serial NOT NULL UNIQUE,
	name varchar(50) NOT NULL,
	email varchar(50),
	phone_number varchar(13),
	city varchar(20) NOT NULL,
	state varchar(2) NOT NULL,
	create_date TIMESTAMP NOT NULL DEFAULT NOW(),
	create_user_id integer NOT NULL,
	update_date TIMESTAMP,
	update_user_id integer,
	deleted BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT suppliers_pk PRIMARY KEY (id)
);

CREATE TABLE purchases (
	id serial NOT NULL UNIQUE,
	supplier_id integer NOT NULL,
	total_price DECIMAL(10,2) NOT NULL,
  number_of_payments integer NOT NULL DEFAULT 1,
	create_date TIMESTAMP NOT NULL DEFAULT NOW(),
	create_user_id integer NOT NULL,
	update_date TIMESTAMP,
	update_user_id integer,
	deleted BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT purchases_pk PRIMARY KEY (id,supplier_id)
);

CREATE TABLE purchase_items (
	id serial NOT NULL UNIQUE,
	purchase_id integer NOT NULL,
	product_id integer NOT NULL,
	amount integer NOT NULL,
	unit_price DECIMAL(10,2) NOT NULL,
	create_date TIMESTAMP NOT NULL DEFAULT NOW(),
	create_user_id integer NOT NULL,
	update_date TIMESTAMP,
	update_user_id integer,
	deleted BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT purchase_items_pk PRIMARY KEY (id,purchase_id,product_id)
);

CREATE TABLE payables (
	id serial NOT NULL UNIQUE,
	purchase_id integer NOT NULL UNIQUE,
	payment_price integer NOT NULL,
	due_date DATE NOT NULL,
	purchase_date DATE NOT NULL DEFAULT NOW(),
	payment_number integer NOT NULL DEFAULT 1,
  payed_date DATE,
	create_date TIMESTAMP NOT NULL DEFAULT NOW(),
	create_user_id integer NOT NULL,
	update_date TIMESTAMP,
	update_user_id integer,
	deleted BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT payables_pk PRIMARY KEY (id)
);

/***********************
 * ANCHOR FOREIGN KEYS *
 ***********************/

ALTER TABLE users ADD CONSTRAINT users_fk0 FOREIGN KEY (create_user_id) REFERENCES users(id);
ALTER TABLE users ADD CONSTRAINT users_fk1 FOREIGN KEY (update_user_id) REFERENCES users(id);

ALTER TABLE suppliers ADD CONSTRAINT suppliers_fk0 FOREIGN KEY (create_user_id) REFERENCES users(id);
ALTER TABLE suppliers ADD CONSTRAINT suppliers_fk1 FOREIGN KEY (update_user_id) REFERENCES users(id);

ALTER TABLE products ADD CONSTRAINT products_fk0 FOREIGN KEY (product_group_id) REFERENCES product_groups(id);
ALTER TABLE products ADD CONSTRAINT products_fk1 FOREIGN KEY (create_user_id) REFERENCES users(id);
ALTER TABLE products ADD CONSTRAINT products_fk2 FOREIGN KEY (update_user_id) REFERENCES users(id);

ALTER TABLE product_groups ADD CONSTRAINT product_groups_fk0 FOREIGN KEY (create_user_id) REFERENCES users(id);
ALTER TABLE product_groups ADD CONSTRAINT product_groups_fk1 FOREIGN KEY (update_user_id) REFERENCES users(id);

ALTER TABLE payables ADD CONSTRAINT payables_fk0 FOREIGN KEY (purchase_id) REFERENCES purchases(id);
ALTER TABLE payables ADD CONSTRAINT payables_fk2 FOREIGN KEY (create_user_id) REFERENCES users(id);
ALTER TABLE payables ADD CONSTRAINT payables_fk3 FOREIGN KEY (update_user_id) REFERENCES users(id);

ALTER TABLE purchases ADD CONSTRAINT purchases_fk0 FOREIGN KEY (supplier_id) REFERENCES suppliers(id);
ALTER TABLE purchases ADD CONSTRAINT purchases_fk1 FOREIGN KEY (create_user_id) REFERENCES users(id);
ALTER TABLE purchases ADD CONSTRAINT purchases_fk2 FOREIGN KEY (update_user_id) REFERENCES users(id);

ALTER TABLE purchase_items ADD CONSTRAINT purchase_items_fk0 FOREIGN KEY (purchase_id) REFERENCES purchases(id);
ALTER TABLE purchase_items ADD CONSTRAINT purchase_items_fk1 FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE purchase_items ADD CONSTRAINT purchase_items_fk2 FOREIGN KEY (create_user_id) REFERENCES users(id);
ALTER TABLE purchase_items ADD CONSTRAINT purchase_items_fk3 FOREIGN KEY (update_user_id) REFERENCES users(id);
