import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_PUBLIC =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU1MjA1NCwiZXhwIjoxOTU5MTI4MDU0fQ.jOFoJHkM3QZ-90MtskDLQpQGLjyEbXP_BBTgYxT9z1o";
const SUPABASE_URL = "https://syrabaclfultwbmoygvl.supabase.co";
const sbClient = createClient(SUPABASE_URL, SUPABASE_ANON_PUBLIC);

// This service listen to update mades on the "messages" table
// to create real time's effect
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
// and order list to give for setMessageList state method.
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
