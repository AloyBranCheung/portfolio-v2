import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" RENAME COLUMN "date_created" TO "year_worked_on";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "date_created" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "projects" DROP COLUMN "year_worked_on";`)
}
