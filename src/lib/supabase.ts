import { config } from "dotenv";
config();

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  `${process.env.DATABASE_URL}`,
  `${process.env.SUPABASE_KEY}`
);

export default supabase;
