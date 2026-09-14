const SUPABASE_URL = https://eeyegahvdqzieqtvgkla.supabase.co/rest/v1/;

const SUPABASE_ANON_KEY = sb_publishable_9o5gW7e53N6rdfdk39m_eQ_KmMCvofC;


// Create Supabase connection
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// Registration form
const registerForm = document.getElementById("registerForm");

const registerMessage = document.getElementById("registerMessage");


registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const fullName =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const country =
        document.getElementById("country").value.trim();

    const preferredClass =
        document.getElementById("preferredClass").value;

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Check passwords
    if (password !== confirmPassword) {

        registerMessage.textContent =
            "Passwords do not match.";

        registerMessage.style.color = "red";

        return;
    }


    registerMessage.textContent =
        "Creating your account...";

    registerMessage.style.color = "#555";


    // Create Supabase account
    const { data, error } =
        await supabaseClient.auth.signUp({

            email: email,

            password: password,

            options: {

                data: {

                    full_name: fullName,

                    phone: phone,

                    country: country,

                    preferred_class: preferredClass,

                    timezone:
                        Intl.DateTimeFormat().resolvedOptions().timeZone

                }

            }

        });


    if (error) {

        registerMessage.textContent =
            error.message;

        registerMessage.style.color = "red";

        return;
    }


    registerMessage.textContent =
        "Account created successfully! Please check your email to confirm your account.";

    registerMessage.style.color = "green";


    registerForm.reset();

});
