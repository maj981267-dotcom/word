import { pgTable, varchar, jsonb, text, timestamp, serial } from 'drizzle-orm/pg-core';

export const words = pgTable('words', {
  id: serial('id').primaryKey(),
  word: varchar('word', { length: 255 }).notNull(),
  context: jsonb('context'),
  commonMeanings: text('common_meanings').notNull(),
  uncommonMeanings: text('uncommon_meanings').notNull(),
  englishExamples: text('english_examples').notNull(),
  synonyms: text('synonyms').notNull(),
  antonyms: text('antonyms').notNull(),
  derivatives: text('derivatives').notNull(),
  prefixes: text('prefixes').notNull(),
  roots: text('roots').notNull(),
  collocations: text('collocations').notNull(),
  confusingWords: text('confusing_words').notNull(),
  importanceLevel: text('importance_level').notNull(),
  memoryAid: text('memory_aid').notNull(),
  importedAt: timestamp('imported_at'),
  createdAt: timestamp('created_at').defaultNow(),
});
