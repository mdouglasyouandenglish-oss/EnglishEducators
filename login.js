const SUPABASE_URL = https://eeyegahvdqzieqtvgkla.supabase.co/rest/v1/;

const SUPABASE_ANON_KEY = sb_publishable_9o5gW7e53N6rdfdk39m_eQ_KmMCvofC;


const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


const loginForm = document.getElementById("loginForm");

const loginMessage = document.getElementById("loginMessage");


loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    loginMessage.textContent = "Logging in...";
    loginMessage.style.color = "#555";


    const { data, error } =
        await supabaseClient.auth.signInWithPassword({

            email: email,
            password: password

        });


    if (error) {

        loginMessage.textContent =
            error.message;

        loginMessage.style.color = "red";

        return;
    }


    loginMessage.textContent =
        "Login successful. Opening your dashboard...";

    loginMessage.style.color = "green";


    window.location.href = "dashboard.html";

});
