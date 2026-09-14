const SUPABASE_URL = https://eeyegahvdqzieqtvgkla.supabase.co/rest/v1/;

const SUPABASE_ANON_KEY = sb_publishable_9o5gW7e53N6rdfdk39m_eQ_KmMCvofC;


const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// Load dashboard
async function loadDashboard() {

    // Check whether student is logged in

    const {
        data: {
            user
        }
    } = await supabaseClient.auth.getUser();


    if (!user) {

        window.location.href = "login.html";

        return;
    }


    // Display email

    document.getElementById(
        "profileEmail"
    ).textContent = user.email;


    // Get student profile

    const {
        data: profile,
        error
    } = await supabaseClient

        .from("profiles")

        .select("*")

        .eq("id", user.id)

        .single();


    if (error) {

        console.error(error);

        return;
    }


    // Display profile

    document.getElementById(
        "studentName"
    ).textContent =
        profile.full_name;


    document.getElementById(
        "profileName"
    ).textContent =
        profile.full_name;


    document.getElementById(
        "profileCountry"
    ).textContent =
        profile.country || "Not provided";


    document.getElementById(
        "profileClass"
    ).textContent =
        profile.preferred_class ||
        "Not selected";


    document.getElementById(
        "classesRemaining"
    ).textContent =
        profile.classes_remaining || 0;


    // Load scheduled classes

    loadClasses(user.id);

}


// Load student's classes

async function loadClasses(studentId) {

    const {
        data: classes,
        error
    } = await supabaseClient

        .from("scheduled_classes")

        .select("*")

        .eq("student_id", studentId)

        .eq("status", "scheduled")

        .order("class_date", {
            ascending: true
        });


    if (error) {

        console.error(error);

        return;
    }


    const classList =
        document.getElementById("classList");


    document.getElementById(
        "upcomingClasses"
    ).textContent =
        classes.length;


    if (classes.length === 0) {

        classList.innerHTML =
            "<p>No upcoming classes.</p>";

        return;
    }


    // Display classes

    classList.innerHTML = "";


    classes.forEach(function(classItem) {

        const div =
            document.createElement("div");


        div.className =
            "scheduled-class";


        div.innerHTML = `

            <h3>
                English Class
            </h3>

            <p>
                📅 ${classItem.class_date}
            </p>

            <p>
                🕐 ${classItem.start_time}
            </p>

        `;


        classList.appendChild(div);

    });


    // Display next class

    const nextClass =
        classes[0];


    document.getElementById(
        "nextClassDate"
    ).textContent =
        "Date: " +
        nextClass.class_date;


    document.getElementById(
        "nextClassTime"
    ).textContent =
        "Time: " +
        nextClass.start_time;

}


// Logout

document
    .getElementById("logoutButton")
    .addEventListener(
        "click",
        async function(event) {

            event.preventDefault();


            await supabaseClient.auth.signOut();


            window.location.href =
                "login.html";

        }
    );


// Start dashboard

loadDashboard();
