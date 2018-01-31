DROP TABLE "users_exchanges";
DROP TABLE "users";
DROP TABLE "exchanges";

CREATE TABLE "users" (
	"_id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"paid_account" BOOLEAN NOT NULL DEFAULT 'false',
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"last_active" TIMESTAMP NOT NULL,
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

CREATE TABLE "users_exchanges" (
	"user_id" serial NOT NULL,
	"exchange_id" serial NOT NULL,
	"token" varchar(255) NOT NULL
) WITH (
  OIDS=FALSE
);

ALTER TABLE "users_exchanges" ADD CONSTRAINT "users_exchanges_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("_id");
ALTER TABLE "users_exchanges" ADD CONSTRAINT "users_exchanges_fk1" FOREIGN KEY ("exchange_id") REFERENCES "exchanges"("_id");
