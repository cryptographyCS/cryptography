CREATE TABLE "users" (
	"_id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"paid_account" BOOLEAN NOT NULL DEFAULT 'false',
	"created" DATE NOT NULL,
	"last_active" DATE NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "exchanges" (
	"_id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	"api_key" varchar(255) NOT NULL,
	CONSTRAINT exchanges_pk PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "users-exchanges" (
	"user_id" serial NOT NULL,
	"exchange_id" serial NOT NULL,
	"token" varchar(255) NOT NULL
) WITH (
  OIDS=FALSE
);

ALTER TABLE "users-exchanges" ADD CONSTRAINT "users-exchanges_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("_id");
ALTER TABLE "users-exchanges" ADD CONSTRAINT "users-exchanges_fk1" FOREIGN KEY ("exchange_id") REFERENCES "exchanges"("_id");
