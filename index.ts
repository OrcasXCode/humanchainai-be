import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { pool, initializeSchema } from './src/db/schema';

dotenv.config();

const app: Express = express();


initializeSchema().catch(console.error);

app.use(express.json());

//!fetch all incidents
app.get("/incidents", async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM incidents ORDER BY reported_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    res.status(500).json({
      message: "Failed to fetch incidents",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

//!create a new incident
app.post("/incidents", async (req: Request, res: Response) => {
  const { title, description, severity } = req.body;

  //validating required fields
  if (!title || !description || !severity) {
    return res.status(400).json({
      message: "Missing required fields: title, description, and severity are required"
    });
  }

  //validating a  severity level
  const validSeverityLevels = ['Low', 'Medium', 'High'];
  if (!validSeverityLevels.includes(severity)) {
    return res.status(400).json({
      message: "Invalid severity level. Must be one of: Low, Medium, High"
    });
  }

  try {
    const result = await pool.query(
      'INSERT INTO incidents (title, description, severity) VALUES ($1, $2, $3) RETURNING *',
      [title, description, severity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating incident:', error);
    res.status(500).json({
      message: "Failed to create incident",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

//!fetch a specific incident
app.get("/incidents/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const result = await pool.query('SELECT * FROM incidents WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching incident:', error);
    res.status(500).json({
      message: "Failed to fetch incident",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

//!delete a specific incident
app.delete("/incidents/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const result = await pool.query('DELETE FROM incidents WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting incident:', error);
    res.status(500).json({
      message: "Failed to delete incident",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});