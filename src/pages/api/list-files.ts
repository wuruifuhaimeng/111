import { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sortBy = 'name', reverse = false } = req.query;

  try {
    const pythonProcess = spawn('python', [
      path.join(process.cwd(), 'file_lister.py'),
      '--sort-by',
      sortBy as string,
      reverse === 'true' ? '--reverse' : ''
    ]);

    let output = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python process error:', error);
        res.status(500).json({ error: 'Failed to list files' });
        return;
      }

      try {
        const files = JSON.parse(output);
        res.status(200).json(files);
      } catch (e) {
        console.error('Error parsing Python output:', e);
        res.status(500).json({ error: 'Failed to parse file list' });
      }
    });
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
} 