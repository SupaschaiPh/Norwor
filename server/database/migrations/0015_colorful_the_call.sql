/*
 SQLite does not support "Set default to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE video ADD `stream_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE video ADD `stream_key` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `video_stream_id_unique` ON `video` (`stream_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `video_stream_key_unique` ON `video` (`stream_key`);