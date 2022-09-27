CREATE TABLE "User" (
	"user-id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"pass-hash" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "User_pk" PRIMARY KEY ("user-id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "realms" (
	"realm-id" serial NOT NULL,
	"user-id" integer NOT NULL,
	"realm-name" varchar(255) NOT NULL,
	"realm-notes" varchar(40000) NOT NULL,
	CONSTRAINT "realms_pk" PRIMARY KEY ("realm-id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "regions" (
	"region-id" serial NOT NULL,
	"realms-id" integer NOT NULL,
	"region-name" varchar(255) NOT NULL,
	"region-notes" varchar(40000) NOT NULL,
	CONSTRAINT "regions_pk" PRIMARY KEY ("region-id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "towns" (
	"town-id" serial NOT NULL,
	"region-id" integer NOT NULL,
	"town-name" varchar(255) NOT NULL,
	"town-notes" varchar(40000) NOT NULL,
	CONSTRAINT "towns_pk" PRIMARY KEY ("town-id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "npcs" (
	"npc-id" serial NOT NULL,
	"town-id" integer NOT NULL,
	"user-id" integer NOT NULL,
	"region-id" integer NOT NULL,
	"realm-id" varchar(255) NOT NULL DEFAULT 'false',
	"is-favorited" BOOLEAN NOT NULL DEFAULT 'false',
	"npc-name" varchar(255) NOT NULL DEFAULT 'false',
	CONSTRAINT "npcs_pk" PRIMARY KEY ("npc-id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "npc-occupation" (
	"occupation-id" serial NOT NULL,
	"npc-id" integer NOT NULL,
	"occupation-name" varchar(255) NOT NULL,
	CONSTRAINT "npc-occupation_pk" PRIMARY KEY ("occupation-id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "establishment" (
	"establishment-id" serial NOT NULL,
	"occupation-id" integer NOT NULL,
	"town-id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"goods/services" varchar(1000) NOT NULL,
	"notes" varchar(40000) NOT NULL,
	"type" varchar(255) NOT NULL,
	CONSTRAINT "establishment_pk" PRIMARY KEY ("establishment-id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "npc-stats" (
	"stats-id" serial NOT NULL,
	"npc-id" integer NOT NULL,
	"str" integer NOT NULL,
	"dex" integer NOT NULL,
	"con" integer NOT NULL,
	"int" integer NOT NULL,
	"wis" integer NOT NULL,
	"cha" integer NOT NULL,
	"hp" integer NOT NULL,
	"ac" integer NOT NULL,
	"initiative" integer NOT NULL,
	CONSTRAINT "npc-stats_pk" PRIMARY KEY ("stats-id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "npc-description" (
	"description-id" serial NOT NULL,
	"npc-id" integer NOT NULL,
	"gender" varchar(255) NOT NULL,
	"race" varchar(255) NOT NULL,
	"hair" varchar(255),
	"skin" varchar(255),
	"eye-color" varchar(255),
	"size" varchar(255),
	"height" varchar(255),
	"weight" varchar(255),
	"age" varchar(255),
	"faith" varchar(255),
	"accent" varchar(255),
	"lang-and-perfs" varchar(1000),
	CONSTRAINT "npc-description_pk" PRIMARY KEY ("description-id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "npc-notes" (
	"notes-id" serial NOT NULL,
	"npc-id" integer NOT NULL,
	"notes-content" varchar(40000) NOT NULL,
	CONSTRAINT "npc-notes_pk" PRIMARY KEY ("notes-id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "realms" ADD CONSTRAINT "realms_fk0" FOREIGN KEY ("user-id") REFERENCES "User"("user-id");

ALTER TABLE "regions" ADD CONSTRAINT "regions_fk0" FOREIGN KEY ("realms-id") REFERENCES "realms"("realm-id");

ALTER TABLE "towns" ADD CONSTRAINT "towns_fk0" FOREIGN KEY ("region-id") REFERENCES "regions"("region-id");

ALTER TABLE "npcs" ADD CONSTRAINT "npcs_fk0" FOREIGN KEY ("town-id") REFERENCES "towns"("town-id");
ALTER TABLE "npcs" ADD CONSTRAINT "npcs_fk1" FOREIGN KEY ("user-id") REFERENCES "User"("user-id");
ALTER TABLE "npcs" ADD CONSTRAINT "npcs_fk2" FOREIGN KEY ("region-id") REFERENCES "regions"("region-id");
ALTER TABLE "npcs" ADD CONSTRAINT "npcs_fk3" FOREIGN KEY ("realm-id") REFERENCES "realms"("realm-id");

ALTER TABLE "npc-occupation" ADD CONSTRAINT "npc-occupation_fk0" FOREIGN KEY ("npc-id") REFERENCES "npcs"("npc-id");

ALTER TABLE "establishment" ADD CONSTRAINT "establishment_fk0" FOREIGN KEY ("occupation-id") REFERENCES "npc-occupation"("occupation-id");
ALTER TABLE "establishment" ADD CONSTRAINT "establishment_fk1" FOREIGN KEY ("town-id") REFERENCES "towns"("town-id");

ALTER TABLE "npc-stats" ADD CONSTRAINT "npc-stats_fk0" FOREIGN KEY ("npc-id") REFERENCES "npcs"("npc-id");

ALTER TABLE "npc-description" ADD CONSTRAINT "npc-description_fk0" FOREIGN KEY ("npc-id") REFERENCES "npcs"("npc-id");

ALTER TABLE "npc-notes" ADD CONSTRAINT "npc-notes_fk0" FOREIGN KEY ("npc-id") REFERENCES "npcs"("npc-id");











