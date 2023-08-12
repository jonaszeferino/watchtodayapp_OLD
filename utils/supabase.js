    import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

    const supabase = createClient(supabaseUrl, supabaseKey);


    console.log('supabaseUrl:', supabaseUrl);
    console.log('supabaseKey:', supabaseKey);

    export default supabase;
