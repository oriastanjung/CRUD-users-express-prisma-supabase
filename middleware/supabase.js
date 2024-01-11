const {createClient} = require("@supabase/supabase-js")
const supabaseClient = createClient("https://azlclhqplkadovuofilp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6bGNsaHFwbGthZG92dW9maWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5NjI3MDIsImV4cCI6MjAyMDUzODcwMn0.9CtmZxtyeIrnzMilz1xiolJYeQn1eNA928kbIyD-pBc")
module.exports = supabaseClient