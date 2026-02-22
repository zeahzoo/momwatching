import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.grade || !data.title || !data.content) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Read existing requests
    const filePath = path.join(process.cwd(), 'public', 'data', 'consulting', 'requests.json');
    let requests = [];
    
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      requests = JSON.parse(fileContents);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      requests = [];
    }

    // Add new request with ID
    const newRequest = {
      id: Date.now(),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    requests.unshift(newRequest); // Add to beginning

    // Save back to file
    await fs.writeFile(filePath, JSON.stringify(requests, null, 2));

    return NextResponse.json({ success: true, id: newRequest.id });
  } catch (error) {
    console.error('Error saving consulting request:', error);
    return NextResponse.json(
      { error: 'Failed to save request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'consulting', 'requests.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const requests = JSON.parse(fileContents);
    
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json([]);
  }
}
