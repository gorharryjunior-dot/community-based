
// MOBILE NAVIGATION
const menuBtn = document.getElementById("menuBtn");
const navigation = document.getElementById("navigation");

menuBtn.addEventListener("click", () => {
    navigation.classList.toggle("active");

    menuBtn.innerHTML = navigation.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll("#navigation a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("active");
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});


// SAFE LOCAL STORAGE
function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        alert("Unable to save data in this browser.");
        return false;
    }
}

function getData(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
        return [];
    }
}


// COMMUNITY POSTS
function addPost() {
    const name = document.getElementById("postName").value.trim();
    const content = document.getElementById("postContent").value.trim();

    if (!name || !content) {
        alert("Please enter your name and your post.");
        return;
    }

    const posts = getData("communityPosts");

    posts.unshift({
        name: name,
        content: content,
        date: new Date().toLocaleString()
    });

    if (!saveData("communityPosts", posts)) return;

    document.getElementById("postName").value = "";
    document.getElementById("postContent").value = "";

    displayPosts();
    alert("Your post has been published!");
}


// DISPLAY POSTS
function displayPosts() {
    const container = document.getElementById("posts");
    const posts = getData("communityPosts");

    container.innerHTML = "";

    // Example post when there are no saved posts
    if (posts.length === 0) {
        const example = document.createElement("article");
        example.className = "post";

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = "JD";

        const content = document.createElement("div");
        const heading = document.createElement("h4");
        heading.textContent = "John Doe";

        const message = document.createElement("p");
        message.textContent =
            "Let us work together to make our community a better place!";

        content.append(heading, message);
        example.append(avatar, content);
        container.appendChild(example);
        return;
    }

    posts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post";

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = post.name.substring(0, 2).toUpperCase();

        const content = document.createElement("div");

        const heading = document.createElement("h4");
        heading.textContent = post.name;

        const message = document.createElement("p");
        message.textContent = post.content;

        const date = document.createElement("small");
        date.textContent = post.date;

        content.append(heading, message, date);
        article.append(avatar, content);
        container.appendChild(article);
    });
}


// JOIN COMMUNITY EVENTS
function joinEvent(eventName) {
    const registrations = getData("eventRegistrations");

    const registration = {
        event: eventName,
        date: new Date().toLocaleString()
    };

    registrations.push(registration);

    if (!saveData("eventRegistrations", registrations)) return;

    alert("You have registered your interest in: " + eventName);
}


// COMMUNITY REPORTS
document.getElementById("reportForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("reportName").value.trim();
    const category = document.getElementById("reportCategory").value;
    const location = document.getElementById("reportLocation").value.trim();
    const description = document.getElementById("reportDescription").value.trim();

    if (!name || !category || !location || !description) {
        alert("Please complete all report fields.");
        return;
    }

    const reports = getData("communityReports");

    reports.push({
        name,
        category,
        location,
        description,
        date: new Date().toLocaleString()
    });

    if (!saveData("communityReports", reports)) return;

    document.getElementById("reportMessage").textContent =
        "Thank you! Your community report has been recorded in this browser.";

    this.reset();
});


// CONTACT FORM
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
        alert("Please complete all contact fields.");
        return;
    }

    const messages = getData("communityMessages");

    messages.push({
        name,
        email,
        message,
        date: new Date().toLocaleString()
    });

    if (!saveData("communityMessages", messages)) return;

    alert("Thank you " + name + "! Your message has been saved in this browser.");

    this.reset();
});


// LOAD SAVED POSTS
displayPosts();
