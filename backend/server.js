import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"
dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);



app.get("/todos", async (req, res) => {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) return res.status(400).json({ error: error.message });
//   console.log(data)
  res.json(data);
});

app.post("/todos", async (req, res) => {
  const { task } = req.body;
  const { data, error } = await supabase.from("todos").insert([{ task }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.listen(3000, () => console.log("Backend running on port 3000"));
