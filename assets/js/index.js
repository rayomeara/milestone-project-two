var users = [["ffoley","warrior"],["gsmith","trainer"],["hobrien","textile"],["sstevens","botanist"]];

function processLogin() {
    var username = document.getElementById("username1").value;
    var password = document.getElementById("password1").value;
    
    for (i=0; i<users.length; i++) {
        if (users[i][0] == username) {
            if (users[i][1] == password) {
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