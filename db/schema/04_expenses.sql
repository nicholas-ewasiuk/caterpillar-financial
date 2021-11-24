CREATE TABLE expenses (
  id SERIAL PRIMARY KEY NOT NULL,
  dataset_id INTEGER REFERENCES datasets(id) ON DELETE CASCADE,
  expense_name VARCHAR(255),
  amount INTEGER
);