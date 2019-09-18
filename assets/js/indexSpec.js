describe("Index page tests", function() {
    it("should return true if username and password correct", function() {
        document.getElementById("username1").value = "ffoley";
        document.getElementById("password1").value = "warrior";
        expect(processLogin()).toBe(true);
    });
    it("should return true if password incorrect", function() {
        document.getElementById("username1").value = "ffoley";
        document.getElementById("password1").value = "tempre";
        expect(processLogin()).toBe(false);
        expect(document.getElementById("messages").innerHTML).toBe("Password Invalid. Please re-enter.");
    }); 
    it("should return false if username not recognized ", function() {
        document.getElementById("username1").value = "panda";
        document.getElementById("password1").value = "warrior";
        expect(processLogin()).toBe(false);
        expect(document.getElementById("messages").innerHTML).toBe("Username Invalid. Please re-enter.");
    });
});