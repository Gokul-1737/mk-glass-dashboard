// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iqxkklqjdspmyeuhsdnc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxeGtrbHFqZHNwbXlldWhzZG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNDkzNTQsImV4cCI6MjA2NTgyNTM1NH0.nS-lZBORKxHgTV87e12JS67wcEpsL1wvjlClItnJ1Pk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);