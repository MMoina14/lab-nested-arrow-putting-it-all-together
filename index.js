


module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};
/**
 * Creates a login tracker for a specific user.
 * 
 * @param {Object} userInfo - Contains username and password.
 * @returns {Function} A closure that tracks login attempts.
 */
function createLoginTracker(userInfo) {
    if (
        !userInfo || 
        typeof userInfo.username !== 'string' || 
        typeof userInfo.password !== 'string'
    ) {
        throw new Error("Invalid userInfo object. Must contain 'username' and 'password' strings.");
    }

    let attemptCount = 0;
    let isLocked = false;

    return (inputPassword) => {
        console.log(`\nLogin attempt #${attemptCount + 1} for user: ${userInfo.username}`);
        console.log(`Input password: ${inputPassword}`);

        if (typeof inputPassword !== 'string') {
            return "Invalid input: password must be a string.";
        }

        if (isLocked) {
            console.log("Account is locked.");
            return "Account locked due to too many failed login attempts";
        }

        attemptCount++;
        console.log(`Attempt count is now: ${attemptCount}`);

        if (inputPassword === userInfo.password) {
            console.log("Correct password. Login successful.");
            return "Login successful";
        } else {
            console.log("Incorrect password.");
            if (attemptCount >= 3) {
                isLocked = true;
                console.log("Account locked due to too many failed login attempts.");
                return "Account locked due to too many failed login attempts";
            }
            return `Attempt ${attemptCount}: Login failed`;
        }
    };
}

const tracker = createLoginTracker({ username: "user1", password: "abc123" });

console.log(tracker("wrong"));      // ❌ Incorrect password. Attempt 1
console.log(tracker("1234"));       // ❌ Incorrect password. Attempt 2
console.log(tracker(1234));         // ❌ Invalid input: password must be a string.
console.log(tracker("oops"));       // ❌ Incorrect password. Account locked
console.log(tracker("abc123"));     // 🚫 Account is locked

const tracker2 = createLoginTracker({ username: "admin", password: "letmein" });

console.log(tracker2("letmein"));   // ✅ Login successful
