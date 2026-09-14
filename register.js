alert("Register JavaScript is working!");
const SUPABASE_URL = https://eeyegahvdqzieqtvgkla.supabase.co/rest/v1/;
const SUPABASE_ANON_KEY = sb_publishable_9o5gW7e53N6rdfdk39m_eQ_KmMCvofC;

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    registerMessage.textContent = "Creating your account...";
    registerMessage.style.color = "#555";

    try {
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const country = document.getElementById("country").value.trim();
        const preferredClass =
            document.getElementById("preferredClass").value;
        const password =
            document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            registerMessage.textContent =
                "Passwords do not match.";
            registerMessage.style.color = "red";
            return;
        }

        if (password.length < 6) {
            registerMessage.textContent =
                "Password must be at least 6 characters.";
            registerMessage.style.color = "red";
            return;
        }

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
                            Intl.DateTimeFormat()
                                .resolvedOptions()
                                .timeZone
                    }
                }
            });

        if (error) {
            throw error;
        }

        registerMessage.textContent =
            "Account created successfully! Please check your email to confirm your account.";
        registerMessage.style.color = "green";

        registerForm.reset();

    } catch (error) {

        console.error("Registration error:", error);

        registerMessage.textContent =
            "Registration failed: " + error.message;

        registerMessage.style.color = "red";
    }
});
