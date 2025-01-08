<div align="center">
  <img src=".github/logo.svg"/>
</div>

#### In build...

##### Create new schema

```ts
// create a schema
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

// run in terminal
// bun run db:generate
// bun run db:migrate
```
