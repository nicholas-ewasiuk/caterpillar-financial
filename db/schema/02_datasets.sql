DROP TABLE IF EXISTS datasets CASCADE;

CREATE TABLE datasets (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  dataset_name VARCHAR(255)
);