# Clear Browser Data (Cookies, Storage)

Open **DevTools → Console** and paste:

```javascript
// Clear ALL cookies for this domain
document.cookie.split(";").forEach(c => {
    document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
});

// Clear localStorage and sessionStorage
localStorage.clear();
sessionStorage.clear();

console.log("✅ All cookies, localStorage, and sessionStorage cleared!");
```

This clears:
- **Cookies** — SID, popup "seen" flags, A/B assignments, etc.
- **localStorage** — journey state, persisted preferences
- **sessionStorage** — temporary session data
