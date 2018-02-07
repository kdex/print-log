# print-log
Prints colored messages to your console.
## Usage
```js
import { log, warn } from "print-log";
log("This is the default style.");
warn("You can use this for warnings.");
```
### Exports
This module exports variadic loggers that will transform every argument to a colorful string representation:
#### log(...args)
Logs a normal log message
#### warn(...args)
Logs a warning
#### err(...args)
Logs an error
#### error(...args)
Alias for `err(...args)`
#### debug(...args)
Logs a debug message
