CREATE TYPE "genre" AS ENUM('sci-fi', 'horror', 'romantic');--> statement-breakpoint
CREATE TABLE "theaters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"city" text NOT NULL,
	"address" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" text NOT NULL,
	"description" text NOT NULL,
	"duration_minutes" integer NOT NULL,
	"language" text NOT NULL,
	"genre" "genre" NOT NULL,
	"release_date" date NOT NULL,
	"poster_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "screens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"theater_id" uuid,
	"name" text NOT NULL,
	"seat_layout" jsonb NOT NULL,
	CONSTRAINT "screens_theater_id_name_unique" UNIQUE("theater_id","name")
);
--> statement-breakpoint
CREATE TABLE "showtimes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"movie_id" uuid NOT NULL,
	"screen_id" uuid NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"base_price" integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX "showtimes_movie_start_idx" ON "showtimes" ("movie_id","start_time");--> statement-breakpoint
CREATE INDEX "showtimes_screen_start_idx" ON "showtimes" ("screen_id","start_time");--> statement-breakpoint
ALTER TABLE "screens" ADD CONSTRAINT "screens_theater_id_theaters_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "theaters"("id");--> statement-breakpoint
ALTER TABLE "showtimes" ADD CONSTRAINT "showtimes_movie_id_movies_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id");--> statement-breakpoint
ALTER TABLE "showtimes" ADD CONSTRAINT "showtimes_screen_id_screens_id_fkey" FOREIGN KEY ("screen_id") REFERENCES "screens"("id");