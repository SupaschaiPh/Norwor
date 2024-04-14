import { sqliteTable, AnySQLiteColumn, uniqueIndex, integer, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	displayName: text("displayName").notNull(),
	username: text("username").notNull(),
	password: text("password").notNull(),
},
(table) => {
	return {
		usernameUnique: uniqueIndex("users_username_unique").on(table.username),
	}
});

export const mqtt = sqliteTable("mqtt", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	host: text("host").default("").notNull(),
	port: integer("port").default(8003).notNull(),
	topic: text("topic").default("DUCKBEECAUSE-XYZ$ALWAYSMISSU").notNull(),
	qos: integer("qos").default(0).notNull(),
	connectTimeout: integer("connect_timeout").default(4000).notNull(),
	path: text("path").default("").notNull(),
});

export const servers = sqliteTable("servers", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	title: text("title").notNull(),
	host: text("host").default("").notNull(),
	port: integer("port").default(80).notNull(),
	path: text("path").default(""),
});

export const video = sqliteTable("video", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	source: text("source").default("").notNull(),
	title: text("title").default("Video2024-04-08T11:31:03.583Z6397878").notNull(),
	description: text("description").default(""),
	cover: text("cover").default("").notNull(),
	streamId: text("stream_id").notNull(),
	streamKey: text("stream_key").notNull(),
},
(table) => {
	return {
		streamKeyUnique: uniqueIndex("video_stream_key_unique").on(table.streamKey),
		streamIdUnique: uniqueIndex("video_stream_id_unique").on(table.streamId),
	}
});