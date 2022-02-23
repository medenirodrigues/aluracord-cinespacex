import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_PUBLIC =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU1MjA1NCwiZXhwIjoxOTU5MTI4MDU0fQ.jOFoJHkM3QZ-90MtskDLQpQGLjyEbXP_BBTgYxT9z1o";
const SUPABASE_URL = "https://syrabaclfultwbmoygvl.supabase.co";
const sbClient = createClient(SUPABASE_URL, SUPABASE_ANON_PUBLIC);

/**
 * This service get supabase's last messages
 */
function getSupaMsg(setMessage) {
  return sbClient
    .from("messages")
    .on("INSERT", (newQuote) => {
      //console.log(newQuote.new.text)
      //console.log("há uma nova mensagem", newQuote.new.text);
      setMessage(newQuote.new);
    })
    .subscribe();
}

//This func is used to insert the object created at "handlerMsg" func
function supaInsertMsg(objMsg) {
  sbClient
    .from("messages")
    .insert(objMsg)
    // ↓ The then() return a response from insertion created above.
    .then((data) => {
      console.log("Dado retornado da inserção", data);
    });
}

/*
  This func is called in UseEffect
*/
function orderList(setMessageList) {
  sbClient
    .from("messages")
    .select("*")
    .order("id", { acending: false })
    .then((supaResponse) => {
      //console.log(supaResponse)
      if (supaResponse.status === 200) setMessageList(supaResponse.data);
    });
}

export {
  getSupaMsg,
  supaInsertMsg,
  orderList,
};
