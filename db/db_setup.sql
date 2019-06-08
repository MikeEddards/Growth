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
  "last_name" varchar(50),
  "image" text
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

CREATE TABLE "weight_0_36" (
  "data_set_id" serial,
  "Sex" integer,
  "Agemos" integer,
  "L" integer,
  "M" integer,
  "S" integer,
  "p3" integer,
  "p5" integer,
  "p10" integer,
  "p25" integer,
  "p50" integer,
  "p75" integer,
  "p90" integer,
  "p95" integer,
  "p97" integer
);

CREATE TABLE "height_0_36" (
  "data_set_id" serial,
  "Sex" integer,
  "Agemos" integer,
  "L" integer,
  "M" integer,
  "S" integer,
  "p3" integer,
  "p5" integer,
  "p10" integer,
  "p25" integer,
  "p50" integer,
  "p75" integer,
  "p90" integer,
  "p95" integer,
  "p97" integer
);

CREATE TABLE "head_0_36" (
  "data_set_id" serial,
  "Sex" integer,
  "Agemos" integer,
  "L" integer,
  "M" integer,
  "S" integer,
  "p3" integer,
  "p5" integer,
  "p10" integer,
  "p25" integer,
  "p50" integer,
  "p75" integer,
  "p90" integer,
  "p95" integer,
  "p97" integer
);

CREATE TABLE "bmi_2_20" (
  "data_set_id" serial,
  "Sex" integer,
  "Agemos" integer,
  "L" integer,
  "M" integer,
  "S" integer,
  "p3" integer,
  "p5" integer,
  "p10" integer,
  "p25" integer,
  "p50" integer,
  "p75" integer,
  "p90" integer,
  "p95" integer,
  "p97" integer
);

CREATE TABLE "height_2_20" (
  "data_set_id" serial,
  "Sex" integer,
  "Agemos" integer,
  "L" integer,
  "M" integer,
  "S" integer,
  "p3" integer,
  "p5" integer,
  "p10" integer,
  "p25" integer,
  "p50" integer,
  "p75" integer,
  "p90" integer,
  "p95" integer,
  "p97" integer
);

CREATE TABLE "weight_2_20" (
  "data_set_id" serial,
  "Sex" integer,
  "Agemos" integer,
  "L" integer,
  "M" integer,
  "S" integer,
  "p3" integer,
  "p5" integer,
  "p10" integer,
  "p25" integer,
  "p50" integer,
  "p75" integer,
  "p90" integer,
  "p95" integer,
  "p97" integer
);

ALTER TABLE "age_data" ADD FOREIGN KEY ("child_id") REFERENCES "child" ("child_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "child" ("parent_id");

ALTER TABLE "age_data" ADD FOREIGN KEY ("parent_id") REFERENCES "users" ("id");