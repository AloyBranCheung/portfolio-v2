import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "certification" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"issuing_organization" varchar NOT NULL,
  	"issue_date" timestamp(3) with time zone,
  	"expiration_date" timestamp(3) with time zone,
  	"credential_i_d" varchar,
  	"credential_u_r_l" varchar,
  	"icon_id" uuid NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "certification_id" uuid;
  ALTER TABLE "certification" ADD CONSTRAINT "certification_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "certification_icon_idx" ON "certification" USING btree ("icon_id");
  CREATE INDEX "certification_updated_at_idx" ON "certification" USING btree ("updated_at");
  CREATE INDEX "certification_created_at_idx" ON "certification" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certification_fk" FOREIGN KEY ("certification_id") REFERENCES "public"."certification"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_certification_id_idx" ON "payload_locked_documents_rels" USING btree ("certification_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "certification" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "certification" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_certification_fk";
  
  DROP INDEX "payload_locked_documents_rels_certification_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "certification_id";`)
}
