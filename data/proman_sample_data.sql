--
-- PostgreSQL database Proman
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';

SET default_with_oids = false;

---
--- drop tables
---

DROP TABLE IF EXISTS statuses CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS users;

---
--- create tables
---

CREATE TABLE statuses (
    id       SERIAL PRIMARY KEY     NOT NULL,
    title    VARCHAR(200)           NOT NULL,
    board_id INTEGER                NOT NULL
);

CREATE TABLE boards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    title       VARCHAR(200)        NOT NULL
);

CREATE TABLE cards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    board_id    INTEGER             NOT NULL,
    status_id   INTEGER             NOT NULL,
    title       VARCHAR (200)       NOT NULL,
    card_order  INTEGER             NOT NULL
);

CREATE TABLE users
(
	id SERIAL
		CONSTRAINT users_pk
			PRIMARY KEY,
	user_name varchar,
	password varchar
);

---
--- insert data
---

INSERT INTO statuses(title, board_id) VALUES ('new', 1);
INSERT INTO statuses(title, board_id) VALUES ('in progress', 1);
INSERT INTO statuses(title, board_id) VALUES ('testing', 1);
INSERT INTO statuses(title, board_id) VALUES ('done', 1);

INSERT INTO statuses(title, board_id) VALUES ('new', 2);
INSERT INTO statuses(title, board_id) VALUES ('in progress', 2);
INSERT INTO statuses(title, board_id) VALUES ('testing', 2);
INSERT INTO statuses(title, board_id) VALUES ('done', 2);

INSERT INTO boards(title) VALUES ('Board 1');
INSERT INTO boards(title) VALUES ('Board 2');

INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 2, 'in progress card', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 3, 'planning', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 5, 'NEW CARD 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 5, 'NEW CARD 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 6, 'IN PROGRESS CARD', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 7, 'PLANNING', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 8, 'DONE CARD 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 8, 'DONE CARD 1', 1);

---
--- add constraints
---

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_status_id FOREIGN KEY (status_id) REFERENCES statuses(id);
