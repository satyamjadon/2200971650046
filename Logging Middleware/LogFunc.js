import axios from 'axios'

export async function log(stack, level, pkg, message) {
  const validStacks = ["backend"];
  const validLevels = ["debug", "info", "warn", "error", "fatal"];
  const validPackages = [
    "cache", "controller", "cron_job", "db", "domain",
    "handler", "repository", "route", "service",
    "auth", "config", "middleware", "utils"
  ];

  if (!validStacks.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
  if (!validLevels.includes(level)) throw new Error(`Invalid level: ${level}`);
  if (!validPackages.includes(pkg)) throw new Error(`Invalid package: ${pkg}`);
  console.log("check1")
  

  const url = 'http://20.244.56.144/evaluation-service/logs';

  try {
    const res = await axios.post(url, {
      stack,
      level,
      package: pkg,
      message
    },
    {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYXR5YW0uMjJnY2ViY3NkMDIxQGdhbGdvdGlhY29sbGVnZS5lZHUiLCJleHAiOjE3NTEwMTk3NzksImlhdCI6MTc1MTAxODg3OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijc5ZTEyN2RhLTFkNjEtNGQ4YS1iZjE5LTIxOGYwNGIwZWU2MiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNhdHlhbSBqYWRvbiIsInN1YiI6IjViZjlhNGNlLWIxNmMtNDA0Mi1iOWEyLTRjYjkzOTBlZGEzYyJ9LCJlbWFpbCI6InNhdHlhbS4yMmdjZWJjc2QwMjFAZ2FsZ290aWFjb2xsZWdlLmVkdSIsIm5hbWUiOiJzYXR5YW0gamFkb24iLCJyb2xsTm8iOiIyMjAwOTcxNjUwMDQ2IiwiYWNjZXNzQ29kZSI6Ik11YWd2cSIsImNsaWVudElEIjoiNWJmOWE0Y2UtYjE2Yy00MDQyLWI5YTItNGNiOTM5MGVkYTNjIiwiY2xpZW50U2VjcmV0IjoicHBuZGtoVFJHVVdDemV0ZSJ9.KTASqI94YqGucwjnLbv34k4HqK-dYQAsMLdkihRkwcA' // Replace with actual key/token
        }
      }
  );
    // console.log("check2", res)

    console.log("check3", res.data)
    return res.data; // { logID, message }
  } catch (error) {
    console.error("Logging failed:", error.message);
  }
}
