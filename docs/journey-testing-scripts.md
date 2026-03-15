# Journey Testing Scripts

Run these in your browser console (DevTools → Console) on any dreamplaypianos.com page.

## Clear Journey Assignment
Removes the journey cookie so the middleware assigns you a new one on next page load:
```js
document.cookie = "dp_journey_id=; path=/; max-age=0"; location.reload();
```

## Check Current Journey
See which journey you're currently assigned to:
```js
document.cookie.match(/dp_journey_id=([^;]+)/)?.[1] || "No journey set"
```

## Force a Specific Journey
Manually assign yourself to a journey (e.g., `journey_c`):
```js
document.cookie = "dp_journey_id=journey_c; path=/; max-age=31536000"; location.reload();
```

## Clear All AB/Analytics Cookies
Nuclear option — clears journey + AB session:
```js
["dp_journey_id", "ab_session_id", "homepage_ab"].forEach(c => document.cookie = c + "=; path=/; max-age=0"); location.reload();
```
