import { supabase } from './supabase';

export const uploadCV = async (name: string, department: string, file: File) => {
  if (!file) {
    throw new Error('No file provided.');
  }

  const fileExtension = file.name.split('.').pop();
  const fileName = `${name.replace(/\s+/g, '_')}_${Date.now()}.${fileExtension}`;
  const filePath = `public/${fileName}`;

  // Upload file to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('lawyered_website')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    throw uploadError;
  }

  // Get the public URL of the uploaded file
  const { data: urlData } = supabase.storage
    .from('lawyered_website')
    .getPublicUrl(filePath);

  const publicUrl = urlData.publicUrl;

  // Insert data into the Supabase table
  const { data: insertData, error: insertError } = await supabase
    .from('lawyered_website')
    .insert([{ name, department, file: publicUrl }]);

  if (insertError) {
    console.error('Error inserting data:', insertError);
    throw insertError;
  }

  return insertData;
};
