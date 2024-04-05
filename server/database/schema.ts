import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
//https://hub.nuxt.com/docs/recipes/drizzle
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  displayName: text('displayName').notNull(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
}) 

export const comments = sqliteTable("comments",{
  id: integer('id').primaryKey({ autoIncrement: true }),
  comments:text("comments").notNull().default("")
})

/*
export const videos = sqliteTable("video",{
  id: integer('id').primaryKey({ autoIncrement: true }),
  source:text('source').notNull(),
  title:text('title').notNull().default("Video"+(new Date()).toISOString()
  +Math.floor(Math.random()*10000000)),
  descption:text('descption').default(""),
  author_id:integer("author_id").references(()=>users.id),
  visibility:text("visibility").default("private").notNull()
})

export const subscription = sqliteTable("subscription",{
  follower_id:integer("follower_id").references(()=>users.id),
  channel_id:integer("channel_id").references(()=>users.id),
})

export const comments = sqliteTable("comments",{
  id: integer('id').primaryKey({ autoIncrement: true }),
  author_id:integer("author_id").references(()=>users.id),
  video_id:integer("video_id").references(()=>users.id),
  comment:text("comment").default("")
})

export const likes = sqliteTable("likes",{
  id: integer('id').primaryKey({ autoIncrement: true }),
  like_by:integer("like_by").references(()=>users.id),
  video_id:integer("video_id").references(()=>users.id)
})



/*
export const usersRelations = relations(users, ({ many}) => ({
  videos: many(videos),
}));

export const videoRelations = relations(videos, ({ one }) => ({
  author: one(users, {
    fields: [videos.author_id],
    references: [users.id],
  }),
}));*/
