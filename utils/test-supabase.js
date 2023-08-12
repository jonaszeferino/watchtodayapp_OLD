// test-supabase.js

import supabase from './supabase'; // Certifique-se de que o caminho para o arquivo supabase.js esteja correto

const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('users') // Substitua 'tasks' pelo nome de uma tabela existente em seu projeto Supabase
      .select('*')
      .limit(1);
      
    if (error) {
      console.error('Error testing Supabase connection:', error.message);
    } else {
      console.log('Supabase connection successful:', data);
    }
  } catch (error) {
    console.error('Error testing Supabase connection:', error.message);
  }
};

testConnection();
