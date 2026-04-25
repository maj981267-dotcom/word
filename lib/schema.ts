import { pgTable, serial, varchar, jsonb, timestamp, text } from 'drizzle-orm/pg-core';

export const words = pgTable('words', {
  id: serial('id').primaryKey(),
  word: varchar('word', { length: 255 }).notNull(),
  context: jsonb('context'),
  commonMeanings: text('common_meanings'),
  uncommonMeanings: text('uncommon_meanings'),
  englishExamples: text('english_examples'),
  synonyms: text('synonyms'),
  antonyms: text('antonyms'),
  derivatives: text('derivatives'),
  prefixes: text('prefixes'),
  roots: text('roots'),
  collocations: text('collocations'),
  confusingWords: text('confusing_words'),
  importanceLevel: text('importance_level'),
  memoryAid: text('memory_aid'),
  importedAt: timestamp('imported_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
