const BASE_URL = "https://avtest.devrabby.com/api/";
const STATIC_TOKEN = "82ca8c3742fba1794d2e2c026c007513";

// Convert object to FormData
function toFormData(data) {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    return formData;
}

// API request
async function apiRequest(endpoint, method = "POST", data = null) {
    const headers = {
        "Token": STATIC_TOKEN
    };

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) headers["accessToken"] = accessToken;

    let body = data ? toFormData(data) : null;

    const response = await fetch(BASE_URL + endpoint, {
        method,
        headers,
        body
    });

    if (!response.ok) return "API failed";

    return await response.json();
}

// login
function loginUser(data) {
    return apiRequest("login/", "POST", data);
}

// logged in user data
function currentUserData() {
    // return JSON.parse(sessionStorage.getItem("userData"));
    return JSON.parse(localStorage.getItem("userData"));
}

// logout
async function logoutUser() {
    try {
        const result = await apiRequest("logout/", "POST");
        console.log('logoutUser >', result);

        if (result.status === 200 || result.status === 603) {
            localStorage.clear();
            // sessionStorage.clear();
            window.location.href = "/login.html";
        } else {
            console.error('Logout failed:', result.message);
            throw new Error("Logout failed:", result.message);
        }
    } catch (err) {
        console.error('Logout failed:', err);
        throw new Error("Logout failed:", err);
    }
}

// dashboard
function getDashboardData() {
    return apiRequest("dashboard/", "POST");
}

// prefill
function getDataPrefill(data) {
    return apiRequest("prefill/", "POST", data);
}

// generate credit report
function generateCreditReport(data) {
    return apiRequest("generate_report/", "POST", data);
}

// list reports
function getCreditReports(data) {
    return apiRequest("report_list/", "POST", data);
}

// list all transaction records
function getAllTransactions(data) {
    return apiRequest("all_transaction_list/", "POST", data);
}

// change password
function changePassword(data) {
    return apiRequest("change_password/", "POST", data);
}

// profile details
function getProfileDetails() {
    return apiRequest("profile/", "POST");
}

// update profile details
function updateProfile(data) {
    return apiRequest("update_profile/", "POST", data);
}

// send reset password link
function forgetPassword(data) {
    return apiRequest("forget_password/", "POST", data);
}

// update forget password
function updateForgetPassword(data) {
    return apiRequest("update_forg_password/", "POST", data);
}

// contact support
function contactSupport(data) {
    return apiRequest("support/", "POST", data);
}

// recharge API
function rechargeAPI(data) {
    return apiRequest("redirectPhonePeSDK/", "POST", data);
}

// register user
function registerUser(data) {
    return apiRequest("register/", "POST", data);
}
