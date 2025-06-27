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
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYXR5YW0uMjJnY2ViY3NkMDIxQGdhbGdvdGlhY29sbGVnZS5lZHUiLCJleHAiOjE3NTEwMTQ0MDYsImlhdCI6MTc1MTAxMzUwNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjIzMGQ1MDZhLWExYWMtNGRjNS04ZGY4LTFhMTVhMGY3NWY0OSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNhdHlhbSBqYWRvbiIsInN1YiI6IjViZjlhNGNlLWIxNmMtNDA0Mi1iOWEyLTRjYjkzOTBlZGEzYyJ9LCJlbWFpbCI6InNhdHlhbS4yMmdjZWJjc2QwMjFAZ2FsZ290aWFjb2xsZWdlLmVkdSIsIm5hbWUiOiJzYXR5YW0gamFkb24iLCJyb2xsTm8iOiIyMjAwOTcxNjUwMDQ2IiwiYWNjZXNzQ29kZSI6Ik11YWd2cSIsImNsaWVudElEIjoiNWJmOWE0Y2UtYjE2Yy00MDQyLWI5YTItNGNiOTM5MGVkYTNjIiwiY2xpZW50U2VjcmV0IjoicHBuZGtoVFJHVVdDemV0ZSJ9.EZhB1zvNfuyo4tRoLMDFmbfD59NNIKirNsUblQ19xBg' // Replace with actual key/token
        }
      }
  );
    console.log("check2", res)

    console.log("check3", res.data)
    return res.data; // { logID, message }
  } catch (error) {
    console.error("Logging failed:", error.message);
    throw new Error("Failed to send log");
  }
}
