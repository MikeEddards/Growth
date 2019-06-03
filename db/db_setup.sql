CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar(50),
  "password" text,
  "email" varchar(50),
  "first_name" varchar(50),
  "last_name" varchar(50),
  "image" text
);

CREATE TABLE "child" (
  "child_id" serial PRIMARY KEY,
  "parent_id" integer,
  "sex" varchar(10),
  "first_name" varchar(50),
  "last_name" varchar(50)
);

CREATE TABLE "age_data" (
  "data_id" serial,
  "parent_id" integer,
  "child_id" integer,
  "age" decimal,
  "height" decimal,
  "weight" decimal,
  "head_size" decimal,
  "image" text
);

ALTER TABLE "age_data" ADD FOREIGN KEY ("child_id") REFERENCES "child" ("child_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "child" ("parent_id");

ALTER TABLE "age_data" ADD FOREIGN KEY ("parent_id") REFERENCES "users" ("id");