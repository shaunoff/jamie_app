process.env.NODE_ENV = "test"

import { loadEnvConfig } from "@blitzjs/env"
loadEnvConfig()

import "./register-ts-paths"
import db from "db"
import seed from "db/seeds"
import { factory } from "test/factories"

let dbSetup = false

const pluginConfig: Cypress.PluginConfig = (on, _config) => {
  on("task", {
    factory,
    "db:reset": async () => {
      //Delete all data without dropping tables, so migration isn't required
      await db.$executeRaw`
      do
      $$
      declare
        l_stmt text;
      begin
        select 'truncate ' || string_agg(format('%I.%I', schemaname, tablename), ',')
        into l_stmt from pg_tables
        where schemaname in ('public');
        execute l_stmt;
      end;
      $$
    `
      return true
    },
    "db:seed": async () => {
      await seed()
      return true
    },
  })
}
export default pluginConfig
