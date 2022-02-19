import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_ANON_PUBLIC =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU1MjA1NCwiZXhwIjoxOTU5MTI4MDU0fQ.jOFoJHkM3QZ-90MtskDLQpQGLjyEbXP_BBTgYxT9z1o";
const SUPABASE_URL = "https://syrabaclfultwbmoygvl.supabase.co";
const sbClient = createClient(SUPABASE_URL, SUPABASE_ANON_PUBLIC);

function rtListenerMessages(setMessage) {
  return sbClient
    .from("messages")
    .on("INSERT", (newQuote) => {
      console.log("há uma nova mensagem", newQuote.new);
      setMessage(newQuote.new);
    })
    .subscribe();
}

function returnedDtMessages(objMessage) {
  sbClient
    .from("messages")
    .insert(objMessage)
    // ↓ O then() aqui retorna uma response da inserção feita acima.
    .then((data) => {
      console.log(data);
    });
}

/*
  Order the messages and set reponse data on the front
*/
function orderList(setMessageList) {
  sbClient
    .from("messages")
    .select("*")
    .order("id", { acending: false })
    .then((supaResponse) => {
      if (supaResponse.status === 200) setMessageList(supaResponse.data);
    });
}

export {
  rtListenerMessages,
  returnedDtMessages,
  orderList,
};
