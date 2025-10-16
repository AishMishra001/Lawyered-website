import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;
    const department = formData.get('department') as string;

    if (!file || !name || !department) {
      return NextResponse.json(
        { error: 'Missing required fields: file, name, department' },
        { status: 400 }
      );
    }

    // Create new FormData for the external API
    const externalFormData = new FormData();
    externalFormData.append('file', file);
    externalFormData.append('name', name);
    externalFormData.append('department', department);

    const response = await fetch('https://nqrygcsflxtvuivtnizf.supabase.co/functions/v1/upload_resume', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcnlnY3NmbHh0dnVpdnRuaXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzY0MjcsImV4cCI6MjA3NTg1MjQyN30.GL60NAkBKMGz2XmivlCQTUiMiR9JpCvCaxN_NaMl5i4'
      },
      body: externalFormData
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Upload failed: ${errorText}` },
        { status: response.status }
      );
    }

    const result = await response.text();
    return NextResponse.json({ message: 'Resume uploaded successfully', result });

  } catch (error) {
    console.error('Error uploading resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
