import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_PUBLIC
const sbClient = createClient(supabaseUrl, supabaseAnonKey);

// This service listen to update mades on the "messages" table
// to create real time's effect in our Chat
function listeningMessageTable(addMessage) {
  return sbClient
    .from("messages")
    .on("INSERT", (newQuote) => {
      addMessage(newQuote.new);
    })
    .subscribe();
}

// This service is used to insert the object
// created at "handlerMessage" callback
function insertMessage(objMessage) {
  sbClient
    .from("messages")
    .insert(objMessage)
    // ↓ The then() return a response from insertion created above.
    .then((data) => {
      console.log("Dado retornado da inserção", data);
    });
}

// This service select whole data on the "message" table
// and order list to give to setMessageList state method.
function refreshList(setMessageList) {
  sbClient
    .from("messages")
    .select("*")
    .order("id", { acending: true })
    .then((supaResponse) => {
      if (supaResponse.status === 200) setMessageList(supaResponse.data);
    });
}

export { listeningMessageTable, insertMessage, refreshList };
