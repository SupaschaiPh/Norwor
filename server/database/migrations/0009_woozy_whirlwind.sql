CREATE TABLE `mqtt` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`host` text NOT NULL,
	`port` integer NOT NULL,
	`topic` text NOT NULL,
	`qos` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `servers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`host` text NOT NULL,
	`port` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `video` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`source` text NOT NULL,
	`title` text DEFAULT 'Video2024-04-05T20:41:20.832Z8202471' NOT NULL,
	`descption` text DEFAULT '',
	`cover` text NOT NULL
);
--> statement-breakpoint
DROP TABLE `comments`;