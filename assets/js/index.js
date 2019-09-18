var users = [["ffoley","warrior","munster"],["gsmith","trainer","leinster"],["hobrien","textile","ulster"],["sstevens","botanist","connaught"]];
sessionStorage.setItem("username","");
sessionStorage.setItem("province","");

function processLogin() {
    var username = document.getElementById("username1").value;
    var password = document.getElementById("password1").value;
    
    for (i=0; i<users.length; i++) {
        if (users[i][0] == username) {
            if (users[i][1] == password) {
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("province", users[i][2]);
                return true;
            } else {
                document.getElementById("messages").innerHTML = "Password Invalid. Please re-enter."
                return false;
            }
        }
    }
    document.getElementById("messages").innerHTML = "Username Invalid. Please re-enter."
    return false;
}