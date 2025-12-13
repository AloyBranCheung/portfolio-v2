import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "date_created" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "made_at_id" uuid;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_made_at_id_company_id_fk" FOREIGN KEY ("made_at_id") REFERENCES "public"."company"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "projects_made_at_idx" ON "projects" USING btree ("made_at_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" DROP CONSTRAINT "projects_made_at_id_company_id_fk";
  
  DROP INDEX "projects_made_at_idx";
  ALTER TABLE "projects" DROP COLUMN "date_created";
  ALTER TABLE "projects" DROP COLUMN "made_at_id";`)
}
